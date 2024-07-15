import { Button } from "@/components/ui/button";
import {
	AppLayout,
	PageHeaderDivider,
	PageHeaderWrapper,
	PageTitle,
} from "@/components/layouts/AppLayout";
import { readers } from "@/data/readers";
import EmptyState from "@/components/modules/readers/EmptyState";
import useTable from "@/hooks/useTable";
import { useState } from "react";
import Pagination from "@/components/layouts/Pagination";
import {
	TableWrapper,
	Table,
	TableHead,
	TableRow,
	TableHeaderCell,
	TableBody,
	TableDataCell,
	TableDropdownWrapper,
	TableDropdownContent,
	TableDropdownButton,
} from "@/components/ui/custom-table";
import { BiSolidTrash } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiCheckboxFill, RiCheckboxBlankLine } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import { MdOutlineSearch } from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";
import { SortControl } from "@/components/common/SortControl";
import { Filter } from "@/components/common/filter";
import { useNavigate } from "react-router-dom";
import { routes } from "@/router/routes";

const AllReaders = () => {
	const [activeRow, setActiveRow] = useState<string | null>(null);
	const [selectedRows, setSelectedRows] = useState<string[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const totalRows = 5;
	const rowsPerPage = 10;
	const { toggleTableDropdown, selectRows, selectAllRows } = useTable(
		activeRow,
		setActiveRow,
		selectedRows,
		setSelectedRows
	);
	const sortOptions = [
		"Enrollment date (newest)",
		"Enrollment date (oldest)",
		"Level (high to low)",
		"Level (low to high)",
		"Course  (high to low)",
		"Course  (low to high)",
	];
	const [sortBy, setSortBy] = useState(sortOptions[0]);
	const locations = ["All", "Location one", "Location two"];
	const [location, setLocation] = useState(locations[0]);
	const genders = ["All", "Male", "Female"];
	const [gender, setGender] = useState(genders[0]);
	const navigate = useNavigate();

	const headers = ["Name", "Cohort", "Enrolled", "Human Book", "Mobile", ""];

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<AppLayout>
			<PageHeaderWrapper className="flex flex-col gap-[12px]">
				<div className="flex items-center justify-between">
					<PageTitle>Readers ({readers.length})</PageTitle>
					{readers.length > 0 && (
						<div className="flex items-center gap-[12px]">
							<SortControl
								setCriterion={setSortBy}
								criterion={sortBy}
								criteria={sortOptions}
								showLabel
							/>

							<Input
								type="search"
								placeholder="Search readers"
								className="w-[250px] border-[#38385B]"
								leftIcon={<MdOutlineSearch />}
							/>

							<Button
								onClick={() =>
									navigate(`/${routes.readers}/${routes.invite_readers}`)
								}>
								Invite Readers
							</Button>
						</div>
					)}
				</div>

				{readers.length > 0 && (
					<div className="flex items-center justify-between">
						<Button>
							January’ 24 Cohort{" "}
							<RiArrowDownSLine className="fill-[#FEFEFE] text-[22px] ml-[12px]" />
						</Button>

						<div className="flex gap-[12px]">
							<Filter
								setCriterion={setLocation}
								criterion={location}
								criteria={locations}
								label="Location"
							/>
							<Filter
								setCriterion={setGender}
								criterion={gender}
								criteria={genders}
								label="Gender"
							/>
						</div>
					</div>
				)}
			</PageHeaderWrapper>

			{readers.length === 0 && <PageHeaderDivider />}

			{readers.length > 0 ? (
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
										onClick={() => selectAllRows(readers.map((r) => r.id!))}>
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
							{readers.map((reader, index) => (
								<TableRow key={index}>
									<TableDataCell>
										<button
											className="block"
											onClick={() => selectRows(reader.id!)}>
											{selectedRows.includes(reader.id!) ? (
												<RiCheckboxFill className="fill-[#80948A] text-[20px]" />
											) : (
												<RiCheckboxBlankLine className="fill-[#80948A] text-[20px]" />
											)}
										</button>
									</TableDataCell>
									<TableDataCell>{reader.name}</TableDataCell>
									<TableDataCell>{reader.cohort}</TableDataCell>
									<TableDataCell>{reader.enrolled}</TableDataCell>
									<TableDataCell>{reader.human_book}</TableDataCell>
									<TableDataCell>{reader.mobile}</TableDataCell>
									<TableDataCell>
										<TableDropdownWrapper>
											<Button
												size="icon"
												variant="ghost"
												onClick={() => toggleTableDropdown(reader.id ?? "")}>
												<BsThreeDotsVertical className="text-[18px]" />
											</Button>
											{activeRow === reader?.id && (
												<TableDropdownContent setActiveRow={setActiveRow}>
													<TableDropdownButton>Details</TableDropdownButton>
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
		</AppLayout>
	);
};

export default AllReaders;
