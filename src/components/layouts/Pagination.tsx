import { Button } from "../ui/button";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";

type PaginationProps = {
	currentPage: number;
	totalRows: number;
	rowsPerPage: number;
	onPageChange: (page: number) => void;
};

const Pagination = ({
	currentPage,
	totalRows,
	rowsPerPage,
	onPageChange,
}: PaginationProps) => {
	const startRow = (currentPage - 1) * rowsPerPage + 1;
	const endRow = Math.min(currentPage * rowsPerPage, totalRows);

	return (
		<div className="bg-white px-[20px] py-[10px] border-t">
			<div className="w-fit flex justify-center items-center">
				<p className="text-[14px] text-[#38385B]">
					{startRow} - {endRow} 0f {totalRows}
				</p>

				<Button
					variant="ghost"
					size="icon"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}>
					<RiArrowLeftSLine className="text-[24px]" />
				</Button>

				<Button
					variant="ghost"
					size="icon"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={endRow === totalRows}>
					<RiArrowRightSLine className="text-[24px]" />
				</Button>
			</div>
		</div>
	);
};

export default Pagination;
