import {
	AppLayout,
	PageHeaderDivider,
	PageHeaderWrapper,
	PageTitle,
} from "@/components/layouts/AppLayout";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { routes } from "@/router/routes";
import {
	RiArrowUpDownFill,
	RiCheckboxBlankLine,
	RiCheckboxFill,
} from "react-icons/ri";
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
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
	TableWrapper,
	Table,
	TableHead,
	TableRow,
	TableHeaderCell,
	TableBody,
	TableDataCell,
} from "@/components/ui/custom-table";
import useTable from "@/hooks/useTable";
import { useState } from "react";
import { BiSolidTrash } from "react-icons/bi";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

type Reader = {
	full_name: string;
	email: string;
	country: string;
	date_of_birth: string;
};

const InviteReaders = () => {
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
	const [openCalender, setOpenCalender] = useState(false);

	const navigate = useNavigate();

	const formSchema = z.object({
		full_name: z.string().min(2, {
			message: "",
		}),
		email: z.string().min(1, {
			message: "",
		}),
		country: z.string().min(1, {
			message: "",
		}),
		date_of_birth: z.date({
			message: "",
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			full_name: "",
			email: "",
			country: "",
		},
	});

	const addReader = (values: z.infer<typeof formSchema>) => {
		const payload = {
			full_name: values.full_name,
			email: values.email,
			country: values.country,
			date_of_birth: format(values.date_of_birth, "dd/MM/yyyy"),
		};

		if (readers.some((r) => r.email === payload.email)) {
			return toast.error("A reader with this email has already been added.");
		}

		setReaders([...readers, payload]);
		form.reset();
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
					<PageTitle>Invite Readers</PageTitle>
					<Button
						onClick={() => navigate(`/${routes.readers}/${routes.import_csv}`)}>
						<RiArrowUpDownFill className="mr-[4px] fill-[#FEFEFE]" />
						Import CSV file
					</Button>
				</div>
			</PageHeaderWrapper>

			<PageHeaderDivider />

			<div className="mt-[36px]">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(addReader)}
						className="grid grid-cols-5 gap-[18px] items-end">
						<FormField
							control={form.control}
							name="full_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Type here..."
											{...field}
											className="border-[#FFCDE3]"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email Address</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="Type here..."
											{...field}
											className="border-[#FFCDE3]"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="country"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Country</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger
												className={`border-[#FFCDE3] ${
													field.value ? "text-[#38385B]" : "text-gray-400"
												}`}>
												<SelectValue placeholder="Select Country" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="NG">Nigeria</SelectItem>
											<SelectItem value="USA">United States</SelectItem>
											<SelectItem value="UK">United Kingdom</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="date_of_birth"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Date of birth</FormLabel>
									<Popover open={openCalender} onOpenChange={setOpenCalender}>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className="border-[#FFCDE3] font-[400] text-[14px]">
													{field.value ? (
														format(field.value, "dd/MM/yyyy")
													) : (
														<span className="text-gray-400">DD/MM/YYYY</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={(date) => {
													field.onChange(date);
													setOpenCalender(false);
												}}
												disabled={(date) =>
													date > new Date() || date < new Date("1900-01-01")
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Add to List</Button>
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

export default InviteReaders;
