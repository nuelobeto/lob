/* eslint-disable react-refresh/only-export-components */
import * as React from "react";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { Button } from "./button";

const TableWrapper = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div className={cn("w-full", className)} {...props}>
			{children}
		</div>
	);
};

const Table = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLTableElement>) => {
	return (
		<table className={cn("w-full border-collapse", className)} {...props}>
			{children}
		</table>
	);
};

const TableHead = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => {
	return (
		<thead className={cn("bg-[#38385B]", className)} {...props}>
			{children}
		</thead>
	);
};

export interface TableBodyProps
	extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableBody = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => {
	return (
		<tbody className={cn("bg-white", className)} {...props}>
			{children}
		</tbody>
	);
};

const TableRow = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLTableRowElement>) => {
	return (
		<tr className={cn(className)} {...props}>
			{children}
		</tr>
	);
};

const TableHeaderCell = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLTableCellElement>) => {
	return (
		<th
			className={cn(
				"px-4 h-[44px] text-left font-[400] text-[13px] text-[#FEFEFE]",
				className
			)}
			{...props}>
			{children}
		</th>
	);
};

const TableDataCell = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLTableCellElement>) => {
	return (
		<td
			className={cn(
				"px-4 h-[54px] text-left font-[300] text-[14px] text-[#80948A]",
				className
			)}
			{...props}>
			{children}
		</td>
	);
};

const TableDropdownWrapper = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={cn(
				"w-fit mx-auto relative flex items-center justify-center",
				className
			)}
			{...props}>
			{children}
		</div>
	);
};

type DropdownProps = {
	setActiveRow: React.Dispatch<React.SetStateAction<string | null>>;
};
type TableDropdownContentProps = React.HTMLAttributes<HTMLDivElement> &
	DropdownProps;
const TableDropdownContent = ({
	className,
	children,
	setActiveRow,
	...props
}: TableDropdownContentProps) => {
	const tableDropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				tableDropdownRef.current &&
				!tableDropdownRef.current.contains(event.target as Node) &&
				!tableDropdownRef.current.parentElement?.contains(event.target as Node)
			) {
				setActiveRow(null);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [tableDropdownRef, setActiveRow]);

	return (
		<div
			className={cn(
				"min-w-[180px] absolute top-[35px] right-0 z-20 flex flex-col gap-[4px] p-[6px] rounded-[6px] bg-[#38385B] shadow-xl h-fit",
				className
			)}
			ref={tableDropdownRef}
			{...props}>
			{children}
		</div>
	);
};

const TableDropdownButton = ({
	className,
	children,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<Button
			className={cn(
				"whitespace-nowrap text-[14px] justify-start h-[32px] font-[400] text-white hover:bg-[#00000047]",
				className
			)}
			{...props}>
			{children}
		</Button>
	);
};

export {
	TableWrapper,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableHeaderCell,
	TableDataCell,
	TableDropdownWrapper,
	TableDropdownContent,
	TableDropdownButton,
};
