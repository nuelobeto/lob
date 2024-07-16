import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaVideo } from "react-icons/fa";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const VideoContent = () => {
	const [editingContent, setEditingContent] = useState(false);

	const formSchema = z.object({
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
			}, "Only MP4, AVI, and MOV files are allowed.")
			.optional(),
		video_description: z.string().optional(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			main_audio_language: "",
			subtitles: "",
			video: undefined as unknown as FileList,
			video_description: "",
		},
	});

	const editVideo = (values: z.infer<typeof formSchema>) => {
		console.log(values);
		setEditingContent(false);
	};

	return (
		<div className="w-full">
			{!editingContent ? (
				<div className="w-full">
					<h3 className="font-[600] text-[14px] text-[#38385B] mb-[18px]">
						Content type: Video
					</h3>
					<div className="flex gap-[24px]">
						<div className="w-[164px] h-fit relative overflow-hidden rounded-[12px]">
							<img src="/assets/woman.png" alt="" className="w-full block" />
							<div className="absolute w-full h-full top-0 left-0 flex items-center justify-center bg-black/10">
								<span className="text-white font-[300] text-[22px]">
									<FaVideo />
								</span>
							</div>
						</div>
						<div className="flex-1 flex flex-col gap-[12px]">
							<h4 className="font-[500] text-[15px] text-[#38385B]">
								Content Title - MP4
							</h4>
							<p className="font-[300] text-[14px] text-[#38385B]">
								<span className="font-[500]">Video description:</span> Lorem
								ipsum dolor sit amet consectetur. Sed diam est tempus blandit
								eget diam. Nibh ac elit faucibus consequat tortor pretium. Sed
								nunc purus vel nulla quis.
							</p>
							<p className="font-[300] text-[14px] text-[#38385B]">
								<span className="font-[500]">Video duration:</span> 5m 6secs
							</p>
							<p className="font-[300] text-[14px] text-[#38385B]">
								<span className="font-[500]">Audio language:</span> English
							</p>
							<p className="font-[300] text-[14px] text-[#38385B]">
								<span className="font-[500]">Cover image:</span> test-image.img
							</p>
						</div>
					</div>
					<div className="flex justify-end mt-[12px]">
						<Button onClick={() => setEditingContent(true)}>
							Edit content
						</Button>
					</div>
				</div>
			) : (
				<div className="w-full">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(editVideo)}
							className="flex flex-col gap-[24px]">
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
																field.value ? "text-[#38385B]" : "text-gray-400"
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
																field.value ? "text-[#38385B]" : "text-gray-400"
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
														onChange={(e) => field.onChange(e.target.files)}
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
							<div className="flex gap-[12px]">
								<Button
									type="button"
									variant="outline"
									onClick={() => setEditingContent(false)}>
									Cancel
								</Button>
								<Button>Save changes</Button>
							</div>
						</form>
					</Form>
				</div>
			)}
		</div>
	);
};

export default VideoContent;
