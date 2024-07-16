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
import { humanBooks } from "@/data/human_books";
import useTable from "@/hooks/useTable";
import { routes } from "@/router/routes";
import { useState } from "react";
import { BiSolidTrash } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineSearch } from "react-icons/md";
import { RiCheckboxFill, RiCheckboxBlankLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const AllHumanBooks = () => {
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
	const languages = ["All", "Yoruba", "English", "Igbo", "Hausa"];
	const [language, setLanguage] = useState(languages[0]);
	const topics = [
		"All",
		"Social Instances",
		"Law",
		"History",
		"Social studies",
		"General",
	];
	const [topic, setTopic] = useState(topics[0]);
	const headers = [
		"Name of Human Book",
		"Country",
		"Readers",
		"Modules",
		"Duration",
		"",
	];
	const navigate = useNavigate();

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<AppLayout>
			<PageHeaderWrapper className="flex flex-col gap-[12px]">
				<div className="flex items-center justify-between">
					<PageTitle>Human Books ({humanBooks.length})</PageTitle>
					{humanBooks.length > 0 && (
						<div className="flex items-center gap-[12px]">
							<SortControl
								setCriterion={setSortBy}
								criterion={sortBy}
								criteria={sortOptions}
								showLabel
							/>

							<Input
								type="search"
								placeholder="Search Human Book"
								className="w-[250px] border-[#38385B]"
								leftIcon={<MdOutlineSearch />}
							/>

							<Button
								onClick={() =>
									navigate(`/${routes.human_books}/${routes.add_book}`)
								}>
								Add Human Books
							</Button>
						</div>
					)}
				</div>

				{humanBooks.length > 0 && (
					<div className="flex items-center justify-end">
						<div className="flex gap-[12px]">
							<Filter
								setCriterion={setLanguage}
								criterion={language}
								criteria={languages}
								label="Language"
							/>
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

			{humanBooks.length === 0 && <PageHeaderDivider />}

			{humanBooks.length > 0 ? (
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
										onClick={() => selectAllRows(humanBooks.map((b) => b.id!))}>
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
							{humanBooks.map((book, index) => (
								<TableRow key={index}>
									<TableDataCell>
										<button
											className="block"
											onClick={() => selectRows(book.id!)}>
											{selectedRows.includes(book.id!) ? (
												<RiCheckboxFill className="fill-[#80948A] text-[20px]" />
											) : (
												<RiCheckboxBlankLine className="fill-[#80948A] text-[20px]" />
											)}
										</button>
									</TableDataCell>
									<TableDataCell>{book.name}</TableDataCell>
									<TableDataCell>{book.country}</TableDataCell>
									<TableDataCell>{book.readers}</TableDataCell>
									<TableDataCell>{book.modules}</TableDataCell>
									<TableDataCell>{book.duration}</TableDataCell>
									<TableDataCell>
										<TableDropdownWrapper>
											<Button
												size="icon"
												variant="ghost"
												onClick={() => toggleTableDropdown(book.id ?? "")}>
												<BsThreeDotsVertical className="text-[18px]" />
											</Button>
											{activeRow === book?.id && (
												<TableDropdownContent setActiveRow={setActiveRow}>
													<TableDropdownButton
														onClick={() =>
															navigate(
																`/${routes.human_books}/${routes.book_details}?book=${book?.id}`
															)
														}>
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
		</AppLayout>
	);
};

export default AllHumanBooks;
