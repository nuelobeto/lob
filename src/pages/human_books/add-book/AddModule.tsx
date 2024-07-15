import Breadcrumbs from "@/components/common/Breadcrumbs";
import {
	AppLayout,
	PageHeaderDivider,
	PageHeaderWrapper,
} from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const AddModule = () => {
	const navigate = useNavigate();

	const formSchema = z.object({
		title: z.string().min(1, {
			message: "",
		}),
		cover_image: z
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
		summary: z.string().min(1, {
			message: "",
		}),
		content_type: z.string().min(1, {
			message: "",
		}),
		text_content: z.string().optional(),
		main_audio_language: z.string().optional(),
		subtitles: z.string().optional(),
		video: z
			.instanceof(FileList)
			.refine((files) => files.length === 1, "Upload a video file")
			.refine((files) => {
				const file = files.item(0);
				return (
					file?.type === "video/mp4" ||
					file?.type === "video/avi" ||
					file?.type === "video/mov"
				);
			}, "Only MP4, AVI, and MOV files are allowed."),
		video_description: z.string().optional(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			cover_image: undefined as unknown as FileList,
			summary: "",
			content_type: "",
			text_content: "",
			main_audio_language: "",
			subtitles: "",
			video: undefined as unknown as FileList,
			video_description: "",
		},
	});

	const contentType = useWatch({
		control: form.control,
		name: "content_type",
	});

	const addModule = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	return (
		<AppLayout>
			<PageHeaderWrapper>
				<Breadcrumbs />
				<div className="flex items-center justify-between">
					<Button onClick={() => navigate(-1)}>Back</Button>
				</div>
			</PageHeaderWrapper>

			<PageHeaderDivider />

			<div className="mt-[36px]">
				<h2 className="font-[500] text-[18px] text-[#38385B]">Book Title</h2>
				<div className="flex mt-[24px] w-full max-w-[800px] mx-auto gap-[64px]">
					<h3 className="font-[500] text-[16px] text-[#38385B]">Module 1</h3>
					<div className="flex-1">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(addModule)}
								className="flex flex-col gap-[24px]">
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter Module Title"
													{...field}
													className="border-[#FFCDE3]"
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
											name="cover_image"
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
									<Button>Upload image</Button>
								</div>
								<FormField
									control={form.control}
									name="summary"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Summary</FormLabel>
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
								<FormField
									control={form.control}
									name="content_type"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Content Type</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}>
												<FormControl>
													<SelectTrigger
														className={`border-[#FFCDE3] ${
															field.value ? "text-[#38385B]" : "text-gray-400"
														}`}>
														<SelectValue placeholder="Select Content Type" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="text">Text Readable</SelectItem>
													<SelectItem value="video">Video</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								{contentType !== "" && (
									<div className="w-full h-[1px] bg-[#C6C6C6] my-[24px]"></div>
								)}
								{contentType === "text" && (
									<Textarea className="h-[382px] border-[#FFCDE3]" />
								)}
								{contentType === "video" && (
									<div className="flex flex-col gap-[24px]">
										<div className="flex gap-[24px]">
											<div className="flex-1">
												<FormField
													control={form.control}
													name="main_audio_language"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Main Audio Language</FormLabel>
															<Select
																onValueChange={field.onChange}
																defaultValue={field.value}>
																<FormControl>
																	<SelectTrigger
																		className={`border-[#FFCDE3] ${
																			field.value
																				? "text-[#38385B]"
																				: "text-gray-400"
																		}`}>
																		<SelectValue placeholder="Select Main Language" />
																	</SelectTrigger>
																</FormControl>
																<SelectContent>
																	<SelectItem value="EN">English</SelectItem>
																	<SelectItem value="FR">French</SelectItem>
																</SelectContent>
															</Select>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
											<div className="flex-1">
												<FormField
													control={form.control}
													name="subtitles"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Subtitles</FormLabel>
															<Select
																onValueChange={field.onChange}
																defaultValue={field.value}>
																<FormControl>
																	<SelectTrigger
																		className={`border-[#FFCDE3] ${
																			field.value
																				? "text-[#38385B]"
																				: "text-gray-400"
																		}`}>
																		<SelectValue placeholder="Select Subtitle" />
																	</SelectTrigger>
																</FormControl>
																<SelectContent>
																	<SelectItem value="EN">English</SelectItem>
																	<SelectItem value="FR">French</SelectItem>
																</SelectContent>
															</Select>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
										</div>
										<div className="flex gap-[24px] items-end">
											<div className="flex-1">
												<FormField
													control={form.control}
													name="video"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Upload video</FormLabel>
															<FormControl>
																<Input
																	type="file"
																	placeholder="Select from computer"
																	onChange={(e) =>
																		field.onChange(e.target.files)
																	}
																	className="border-[#FFCDE3]"
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
											<Button>Upload video</Button>
										</div>
										<FormField
											control={form.control}
											name="video_description"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Video Description</FormLabel>
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
									</div>
								)}

								<div className="w-full h-[1px] bg-[#C6C6C6] my-[24px]"></div>

								<div className="w-full flex justify-end gap-[24px]">
									<Button onClick={form.handleSubmit(addModule)}>
										Submit module
									</Button>
									<Button onClick={form.handleSubmit(addModule)}>
										Save & continue
									</Button>
								</div>
							</form>
						</Form>
					</div>
				</div>
			</div>
		</AppLayout>
	);
};

export default AddModule;
