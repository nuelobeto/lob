import Breadcrumbs from "@/components/common/Breadcrumbs";
import {
	AppLayout,
	PageHeaderWrapper,
	PageHeaderDivider,
} from "@/components/layouts/AppLayout";
import VideoContent from "@/components/modules/humanBooks/VideoContent";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import {
	RiEdit2Fill,
	RiCheckFill,
	RiCloseLine,
	RiAddFill,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { routes } from "@/router/routes";

const AddContent = () => {
	const [moduleTitle, setModuleTitle] = useState("Module one");
	const [editingModuleTitle, setEditingModuleTitle] = useState(false);
	const moduleTitleRef = useRef<HTMLInputElement>(null);
	const [moduleSummary, setModuleSummary] = useState(
		"Lorem ipsum dolor sit amet consectetur. Sed diam est tempus blandit eget diam. Nibh ac elit faucibus consequat tortor pretium. Sed nunc purus vel nulla quis volutpat pellentesque aliquam. Scelerisque erat ipsum mauris sed semper massa."
	);
	const [editingModuleSummary, setEditingModuleSummary] = useState(false);
	const moduleSummaryRef = useRef<HTMLTextAreaElement>(null);
	const [openContentTypes, setOpenContentTypes] = useState(false);

	const navigate = useNavigate();

	const cancelModuleTitleEdit = () => {
		setEditingModuleTitle(false);
		setModuleTitle("Module one");
	};

	const saveModuleTitle = () => {
		setEditingModuleTitle(false);
	};

	const cancelModuleSummaryEdit = () => {
		setEditingModuleSummary(false);
		setModuleSummary(
			"Lorem ipsum dolor sit amet consectetur. Sed diam est tempus blandit eget diam. Nibh ac elit faucibus consequat tortor pretium. Sed nunc purus vel nulla quis volutpat pellentesque aliquam. Scelerisque erat ipsum mauris sed semper massa."
		);
	};

	const saveModuleSummary = () => {
		setEditingModuleSummary(false);
	};

	useEffect(() => {
		if (editingModuleTitle && moduleTitleRef.current) {
			moduleTitleRef.current.focus();
		}
	}, [editingModuleTitle]);

	useEffect(() => {
		if (editingModuleSummary && moduleSummaryRef.current) {
			moduleSummaryRef.current.focus();
		}
	}, [editingModuleSummary]);

	return (
		<AppLayout>
			<PageHeaderWrapper>
				<Breadcrumbs />
				<div className="flex items-center justify-between">
					<Button onClick={() => navigate(-1)}>Back</Button>
				</div>
			</PageHeaderWrapper>

			<PageHeaderDivider />

			<div className="mt-[36px] pb-[80px]">
				<h2 className="font-[500] text-[18px] text-[#38385B]">Book one</h2>
				<div className="flex mt-[24px] w-full max-w-[800px] mx-auto gap-[64px]">
					<h3 className="w-[70px] font-[500] text-[16px] text-[#38385B]">
						Module 1
					</h3>
					<div className="flex-1 max-w-[700px]">
						<div className="flex items-center gap-[8px]">
							<input
								ref={moduleTitleRef}
								value={moduleTitle}
								disabled={!editingModuleTitle}
								onChange={(e) => setModuleTitle(e.target.value)}
								className="w-[300px] rounded-md px-[14px] border outline-none text-[14px] text-[#38385B] h-10 border-[#FFCDE3]"
							/>
							<div className="flex items-center">
								{!editingModuleTitle && (
									<Button
										variant="ghost"
										size="icon"
										onClick={() => setEditingModuleTitle(true)}>
										<RiEdit2Fill className="text-[22px] fill-[#38385B]" />
									</Button>
								)}
								{editingModuleTitle && (
									<>
										<Button
											variant="ghost"
											size="icon"
											onClick={saveModuleTitle}>
											<RiCheckFill className="text-[22px] fill-[#38385B]" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											onClick={cancelModuleTitleEdit}>
											<RiCloseLine className="text-[22px] fill-[#38385B]" />
										</Button>
									</>
								)}
							</div>
						</div>

						<div className="flex gap-[8px] mt-[32px]">
							<div className="flex flex-col gap-[8px] flex-1">
								<p className="font-[400] text-[16px] leading-[1.5] text-[#38385B]">
									<span className="font-[600]">Summary of {moduleTitle}:</span>{" "}
									{!editingModuleSummary && (
										<span className="font-[300]">{moduleSummary}</span>
									)}
								</p>

								<div className="flex">
									{editingModuleSummary && (
										<Textarea
											ref={moduleSummaryRef}
											value={moduleSummary}
											onChange={(e) => setModuleSummary(e.target.value)}
											className="border-[#FFCDE3] h-[150px] w-full mr-[8px]"
										/>
									)}

									{editingModuleSummary && (
										<>
											<Button
												variant="ghost"
												size="icon"
												onClick={saveModuleSummary}>
												<RiCheckFill className="text-[22px] fill-[#38385B]" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												onClick={cancelModuleSummaryEdit}>
												<RiCloseLine className="text-[22px] fill-[#38385B]" />
											</Button>
										</>
									)}
								</div>
							</div>

							{!editingModuleSummary && (
								<div className="flex">
									<Button
										variant="ghost"
										size="icon"
										onClick={() => setEditingModuleSummary(true)}>
										<RiEdit2Fill className="text-[22px] fill-[#38385B]" />
									</Button>
								</div>
							)}
						</div>
					</div>
				</div>

				<Separator className="my-[32px] bg-[#80948A]" />

				<div className="w-full max-w-[800px] mx-auto pl-[134px]">
					<VideoContent />
				</div>
			</div>

			<div className="absolute bottom-0 left-[30px]  w-[calc(100%-60px)] h-[80px] border-t border-[#C6C6C6] bg-[#FFF6FA] flex justify-between items-center gap-[24px]">
				<Popover open={openContentTypes} onOpenChange={setOpenContentTypes}>
					<PopoverTrigger asChild>
						<Button>
							<RiAddFill className="mr-[8px] text-[18px]" />
							Add Content
						</Button>
					</PopoverTrigger>
					<PopoverContent className="flex flex-col p-[6px] w-[180px]">
						<Button
							variant="ghost"
							size="xs"
							className="justify-start"
							onClick={() => setOpenContentTypes(false)}>
							Text Readable
						</Button>
						<Button
							variant="ghost"
							size="xs"
							className="justify-start"
							onClick={() => setOpenContentTypes(false)}>
							Video
						</Button>
					</PopoverContent>
				</Popover>

				<Button
					onClick={() =>
						navigate(
							`/${routes.human_books}/${routes.add_book}/${routes.book_summary}`
						)
					}>
					Submit Module
				</Button>
			</div>
		</AppLayout>
	);
};

export default AddContent;
