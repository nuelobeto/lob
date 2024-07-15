import Breadcrumbs from "@/components/common/Breadcrumbs";
import {
	AppLayout,
	PageHeaderDivider,
	PageHeaderWrapper,
	PageTitle,
} from "@/components/layouts/AppLayout";
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
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { routes } from "@/router/routes";

const AddBookForm = () => {
	const navigate = useNavigate();

	const formSchema = z.object({
		book: z.string().min(1, {
			message: "",
		}),
		topic: z.string().min(1, {
			message: "",
		}),
		bio: z.string().min(1, {
			message: "",
		}),
		image: z
			.instanceof(FileList)
			.refine((files) => files.length === 1, "Upload an image cover")
			.refine((files) => {
				const file = files.item(0);
				return (
					file?.type === "image/png" ||
					file?.type === "image/jpeg" ||
					file?.type === "image/jpg"
				);
			}, "Only PNG, JPG, and JPEG files are allowed."),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			book: "",
			topic: "",
			bio: "",
			image: undefined as unknown as FileList,
		},
	});

	const addBook = (values: z.infer<typeof formSchema>) => {
		console.log(values);
		navigate(
			`/${routes.human_books}/${routes.add_book}/${routes.add_module}?book=bookId`
		);
		form.reset();
	};

	return (
		<AppLayout>
			<PageHeaderWrapper>
				<Breadcrumbs />
				<PageTitle>Add Books</PageTitle>
			</PageHeaderWrapper>

			<PageHeaderDivider />

			<div className="mt-[36px] flex gap-[24px]">
				<div className="flex-1">
					<h2 className="font-[500] text-[20px] leading-[1.5] text-[#38385B]">
						Human Book Information
					</h2>
					<p className="font-[400] text-[14px] leading-[1.5] text-[#80948A]">
						Fill in details of the Human Book you would like to create.
					</p>
				</div>

				<div className="w-full max-w-[700px]">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(addBook)}
							className="flex flex-col gap-[24px]">
							<div className="flex gap-[24px]">
								<div className="flex-1">
									<FormField
										control={form.control}
										name="book"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Human Book</FormLabel>
												<FormControl>
													<Input
														placeholder="Enter Human Book"
														{...field}
														className="border-[#FFCDE3]"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="flex-1">
									<FormField
										control={form.control}
										name="topic"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Add Topic</FormLabel>
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
														<SelectItem value="history">History</SelectItem>
														<SelectItem value="human rights">
															Human Rights
														</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
							<FormField
								control={form.control}
								name="bio"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Short Biography</FormLabel>
										<FormControl>
											<Textarea
												className="resize-none h-[132px] border-[#FFCDE3]"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex gap-[24px] items-end">
								<div className="flex-1">
									<FormField
										control={form.control}
										name="image"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Cover Image</FormLabel>
												<FormControl>
													<Input
														type="file"
														placeholder="Select Cover image"
														onChange={(e) => field.onChange(e.target.files)}
														className="border-[#FFCDE3]"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<Button type="button">Upload image</Button>
							</div>
							<Button type="submit" size="lg" className="mt-[24px]">
								Save & Continue
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</AppLayout>
	);
};

export default AddBookForm;
