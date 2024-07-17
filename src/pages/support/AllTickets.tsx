import { SortControl } from "@/components/common/SortControl";
import { Filter } from "@/components/common/filter";
import {
	AppLayout,
	PageHeaderDivider,
	PageHeaderWrapper,
	PageTitle,
} from "@/components/layouts/AppLayout";
import Pagination from "@/components/layouts/Pagination";
import EmptyState from "@/components/modules/humanBooks/EmptyState";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableDataCell,
	TableDropdownButton,
	TableDropdownContent,
	TableDropdownWrapper,
	TableHead,
	TableHeaderCell,
	TableRow,
	TableWrapper,
} from "@/components/ui/custom-table";
import { Input } from "@/components/ui/input";
import { tickets } from "@/data/support";
import useTable from "@/hooks/useTable";
import { routes } from "@/router/routes";
import { useEffect, useState } from "react";
import { BiSolidTrash } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineSearch } from "react-icons/md";
import { RiCheckboxFill, RiCheckboxBlankLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import useQuery from "@/hooks/useQuery";
import TicketDetails from "@/components/modules/support/TicketDetails";

const AllTickets = () => {
	const [activeRow, setActiveRow] = useState<string | null>(null);
	const [selectedRows, setSelectedRows] = useState<string[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const totalRows = 10;
	const rowsPerPage = 10;
	const { toggleTableDropdown, selectRows, selectAllRows } = useTable(
		activeRow,
		setActiveRow,
		selectedRows,
		setSelectedRows
	);
	const sortOptions = [
		"Readers (low to high)",
		"Readers (high to low)",
		"Date (newest)",
		"Date (Oldest)",
		"Most Liked",
		"Completion Rate",
	];
	const [sortBy, setSortBy] = useState(sortOptions[0]);
	const [date, setDate] = useState<DateRange | undefined>(undefined);
	const topics = [
		"All",
		"Social Instances",
		"Law",
		"History",
		"Social studies",
		"General",
	];
	const [topic, setTopic] = useState(topics[0]);
	const headers = ["Ticket ID", "Subject", "Reader", "Status", "Date", ""];
	const navigate = useNavigate();
	const ticketStatuses = ["Open", "Closed"];
	const ticketStatus = useQuery().get("status");
	const filteredTickets = tickets.filter((t) => t.status === ticketStatus);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	useEffect(() => {
		navigate(`/${routes.support}?status=open`);
	}, [navigate]);

	return (
		<AppLayout>
			<PageHeaderWrapper className="flex flex-col gap-[12px]">
				<div className="flex items-center justify-between">
					<PageTitle>Support ({tickets.length})</PageTitle>
					{tickets.length > 0 && (
						<div className="flex items-center gap-[12px]">
							<SortControl
								setCriterion={setSortBy}
								criterion={sortBy}
								criteria={sortOptions}
								showLabel
							/>

							<Input
								type="search"
								placeholder="Search support"
								className="w-[250px] border-[#38385B]"
								leftIcon={<MdOutlineSearch />}
							/>
						</div>
					)}
				</div>

				{tickets.length > 0 && (
					<div className="flex items-center justify-between">
						<div className="flex shadow-md rounded-[4px] overflow-hidden">
							{ticketStatuses.map((status, index) => (
								<Button
									key={index}
									className={`rounded-none w-[100px] ${
										status.toLowerCase() === ticketStatus
											? "bg-[#38385B] text-[#FEFEFE]"
											: "bg-white text-[#38385B] hover:bg-[#38385B]/20"
									}`}
									onClick={() =>
										navigate(
											`/${routes.support}?status=${status.toLowerCase()}`
										)
									}>
									{status}
								</Button>
							))}
						</div>

						<div className="flex gap-[12px]">
							<div className="">
								<Popover>
									<PopoverTrigger asChild>
										<Button
											id="date"
											variant={"outline"}
											className={cn(
												"w-[300px] justify-start text-left font-normal",
												!date && "text-muted-foreground"
											)}>
											<span className="text-[#38385B] mr-[8px]">Date:</span>
											{date?.from ? (
												date.to ? (
													<>
														{format(date.from, "LLL dd, y")} -{" "}
														{format(date.to, "LLL dd, y")}
													</>
												) : (
													format(date.from, "LLL dd, y")
												)
											) : (
												<span className="text-[#959595]">
													DD/MM/YY - DD/MM/YY
												</span>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											initialFocus
											mode="range"
											defaultMonth={date?.from}
											selected={date}
											onSelect={setDate}
											numberOfMonths={2}
										/>
									</PopoverContent>
								</Popover>
							</div>
							<Filter
								setCriterion={setTopic}
								criterion={topic}
								criteria={topics}
								label="Topic"
							/>
						</div>
					</div>
				)}
			</PageHeaderWrapper>

			{tickets.length === 0 && <PageHeaderDivider />}

			{filteredTickets.length > 0 ? (
				<TableWrapper className="mt-[18px]">
					{selectedRows.length > 0 && (
						<div className="flex items-center justify-end mb-[12px]">
							<Button size="xs" variant="destructive">
								<BiSolidTrash className="fill-white mr-[8px] text-[16px]" />{" "}
								Delete ({selectedRows.length})
							</Button>
						</div>
					)}
					<Table>
						<TableHead>
							<TableRow>
								<TableHeaderCell>
									<button
										className="block"
										onClick={() =>
											selectAllRows(filteredTickets.map((t) => t.id!))
										}>
										{selectedRows.length > 0 ? (
											<RiCheckboxFill className="fill-[#80948A] text-[20px]" />
										) : (
											<RiCheckboxBlankLine className="fill-[#80948A] text-[20px]" />
										)}
									</button>
								</TableHeaderCell>
								{headers.map((header, index) => (
									<TableHeaderCell key={index}>{header}</TableHeaderCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{filteredTickets.map((ticket, index) => (
								<TableRow key={index}>
									<TableDataCell>
										<button
											className="block"
											onClick={() => selectRows(ticket.id!)}>
											{selectedRows.includes(ticket.id!) ? (
												<RiCheckboxFill className="fill-[#80948A] text-[20px]" />
											) : (
												<RiCheckboxBlankLine className="fill-[#80948A] text-[20px]" />
											)}
										</button>
									</TableDataCell>
									<TableDataCell>{ticket.ticket_id}</TableDataCell>
									<TableDataCell>{ticket.subject}</TableDataCell>
									<TableDataCell>{ticket.reader}</TableDataCell>
									<TableDataCell>{ticket.status}</TableDataCell>
									<TableDataCell>{ticket.date}</TableDataCell>
									<TableDataCell>
										<TableDropdownWrapper>
											<Button
												size="icon"
												variant="ghost"
												onClick={() => toggleTableDropdown(ticket.id ?? "")}>
												<BsThreeDotsVertical className="text-[18px]" />
											</Button>
											{activeRow === ticket?.id && (
												<TableDropdownContent setActiveRow={setActiveRow}>
													<TableDropdownButton
														onClick={() => {
															navigate(
																`/${routes.support}?status=${ticketStatus}&ticketId=${ticket.id}`
															);
															setActiveRow(null);
														}}>
														Details
													</TableDropdownButton>
													<TableDropdownButton>Delete</TableDropdownButton>
												</TableDropdownContent>
											)}
										</TableDropdownWrapper>
									</TableDataCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<Pagination
						currentPage={currentPage}
						totalRows={totalRows}
						rowsPerPage={rowsPerPage}
						onPageChange={handlePageChange}
					/>
				</TableWrapper>
			) : (
				<EmptyState />
			)}

			<TicketDetails />
		</AppLayout>
	);
};

export default AllTickets;
