import Breadcrumbs from "@/components/common/Breadcrumbs";
import {
	AppLayout,
	PageHeaderDivider,
	PageHeaderWrapper,
	PageTitle,
} from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { routes } from "@/router/routes";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useTable from "@/hooks/useTable";
import { useState } from "react";
import {
	Table,
	TableBody,
	TableDataCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	TableWrapper,
} from "@/components/ui/custom-table";
import { BiSolidTrash } from "react-icons/bi";
import { RiCheckboxFill, RiCheckboxBlankLine } from "react-icons/ri";

type Reader = {
	full_name: string;
	email: string;
	country: string;
	date_of_birth: string;
};

const ImportReadersCsv = () => {
	const [readers, setReaders] = useState<Reader[]>([]);
	const [activeRow, setActiveRow] = useState<string | null>(null);
	const [selectedRows, setSelectedRows] = useState<string[]>([]);
	const { selectRows, selectAllRows } = useTable(
		activeRow,
		setActiveRow,
		selectedRows,
		setSelectedRows
	);
	const headers = [
		"Full Name",
		"Email Address",
		"Country",
		"Date of Birth",
		"",
	];
	const navigate = useNavigate();

	const formSchema = z.object({
		csv_file: z
			.instanceof(FileList)
			.refine((files) => files.length === 1, "Please upload a file.")
			.refine(
				(files) => files.item(0)?.type === "text/csv",
				"Only CSV files are allowed."
			),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			csv_file: undefined as unknown as FileList,
		},
	});

	const uploadCSV = (values: z.infer<typeof formSchema>) => {
		const file = values.csv_file.item(0);
		if (file) {
			console.log(file);

			const reader = new FileReader();
			reader.onload = (event) => {
				const csvData = event.target?.result;
				console.log(csvData);
			};
			reader.readAsText(file);
		}
	};

	const deleteReader = (email: string) => {
		setReaders(readers.filter((r) => r.email !== email));
	};

	const deleteReaders = () => {
		setReaders(readers.filter((r) => !selectedRows.includes(r.email)));
		setSelectedRows([]);
	};

	return (
		<AppLayout>
			<PageHeaderWrapper className="flex flex-col">
				<Breadcrumbs />
				<div className="flex items-center justify-between">
					<PageTitle>Import CSV file</PageTitle>
					<Button
						onClick={() =>
							navigate(`/${routes.readers}/${routes.invite_readers}`)
						}>
						“Return or”
					</Button>
				</div>
			</PageHeaderWrapper>

			<PageHeaderDivider />

			<div className="mt-[36px]">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(uploadCSV)}
						className="flex gap-[18px] items-end">
						<FormField
							control={form.control}
							name="csv_file"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Add CSV file</FormLabel>
									<FormControl>
										<Input
											type="file"
											accept=".csv"
											placeholder="Select from computer"
											onChange={(e) => field.onChange(e.target.files)}
											className="border-[#FFCDE3] w-[300px]"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Upload CSV file</Button>
					</form>
				</Form>

				<TableWrapper className="mt-[48px]">
					{selectedRows.length > 0 && (
						<div className="flex items-center justify-end mb-[12px]">
							<Button size="xs" variant="destructive" onClick={deleteReaders}>
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
										onClick={() => selectAllRows(readers.map((r) => r.email))}>
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
											onClick={() => selectRows(reader.email)}>
											{selectedRows.includes(reader.email) ? (
												<RiCheckboxFill className="fill-[#80948A] text-[20px]" />
											) : (
												<RiCheckboxBlankLine className="fill-[#80948A] text-[20px]" />
											)}
										</button>
									</TableDataCell>
									<TableDataCell>{reader.full_name}</TableDataCell>
									<TableDataCell>{reader.email}</TableDataCell>
									<TableDataCell>{reader.country}</TableDataCell>
									<TableDataCell>{reader.date_of_birth}</TableDataCell>
									<TableDataCell>
										<Button
											variant="ghost"
											size="icon"
											onClick={() => deleteReader(reader.email)}>
											<BiSolidTrash className="text-[20px]" />
										</Button>
									</TableDataCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					{readers.length === 0 && (
						<div className="w-full h-[50px] bg-white"></div>
					)}
				</TableWrapper>

				<div className="flex justify-end pt-[36px]">
					<Button className="w-[173px]">
						Send Invite{readers.length > 1 && "s"}
					</Button>
				</div>
			</div>
		</AppLayout>
	);
};

export default ImportReadersCsv;
