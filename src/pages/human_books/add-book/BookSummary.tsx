import Breadcrumbs from "@/components/common/Breadcrumbs";
import {
	AppLayout,
	PageHeaderDivider,
	PageHeaderWrapper,
} from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	RiCloseLine,
	RiEdit2Fill,
	RiCheckFill,
	RiAddFill,
} from "react-icons/ri";
import { Textarea } from "@/components/ui/textarea";
import { BiSolidTrash } from "react-icons/bi";
import { routes } from "@/router/routes";

const BookSummary = () => {
	const [title, setTitle] = useState("Book title");
	const [editingTitle, setEditingTitle] = useState(false);
	const [about, setAbout] = useState(
		"Lorem ipsum dolor sit amet consectetur. Sed diam est tempus blandit eget diam. Nibh ac elit faucibus consequat tortor pretium. Sed nunc purus vel nulla quis volutpat pellentesque aliquam. Scelerisque erat ipsum mauris sed semper massa."
	);
	const [editingAbout, setEditingAbout] = useState(false);

	const navigate = useNavigate();
	const inputRef = useRef<HTMLInputElement>(null);

	const cancelTitleEdit = () => {
		setEditingTitle(false);
		setTitle("Book title");
	};

	const saveTitle = () => {
		setEditingTitle(false);
	};

	const editImage = () => {
		console.log("image");
	};

	const cancelAboutEdit = () => {
		setEditingAbout(false);
		setAbout(
			"Lorem ipsum dolor sit amet consectetur. Sed diam est tempus blandit eget diam. Nibh ac elit faucibus consequat tortor pretium. Sed nunc purus vel nulla quis volutpat pellentesque aliquam. Scelerisque erat ipsum mauris sed semper massa."
		);
	};

	const saveAbout = () => {
		setEditingAbout(false);
	};

	useEffect(() => {
		if (editingTitle && inputRef.current) {
			inputRef.current.focus();
		}
	}, [editingTitle]);

	return (
		<AppLayout>
			<PageHeaderWrapper>
				<Breadcrumbs />
				<div className="flex justify-between">
					<Button onClick={() => navigate(-1)}>Back</Button>
					<Button onClick={() => navigate(`/${routes.human_books}`)}>
						Publish
					</Button>
				</div>
			</PageHeaderWrapper>

			<PageHeaderDivider />

			<div className="mt-[48px]">
				<div className="flex items-center gap-[8px]">
					<input
						ref={inputRef}
						value={title}
						disabled={!editingTitle}
						onChange={(e) => setTitle(e.target.value)}
						className="bg-transparent border-b w-[250px] outline-none text-[14px] text-[#38385B] h-10"
					/>
					<div className="flex items-center">
						{!editingTitle && (
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setEditingTitle(true)}>
								<RiEdit2Fill className="text-[22px] fill-[#38385B]" />
							</Button>
						)}
						{editingTitle && (
							<>
								<Button variant="ghost" size="icon" onClick={saveTitle}>
									<RiCheckFill className="text-[22px] fill-[#38385B]" />
								</Button>
								<Button variant="ghost" size="icon" onClick={cancelTitleEdit}>
									<RiCloseLine className="text-[22px] fill-[#38385B]" />
								</Button>
							</>
						)}
					</div>
				</div>

				<div className="w-full max-w-[550px] mt-[24px]">
					<div>
						<label
							htmlFor="file"
							className="w-[164px] h-full flex items-center justify-center relative cursor-pointer rounded-[12px] overflow-hidden group">
							<img src="/assets/woman.png" alt="" className="w-full block" />
							<div className="hidden absolute w-full h-full top-0 left-0 items-center justify-center bg-black/50 group-hover:flex">
								<span className="text-white font-[300] text-[12px]">
									Upload image
								</span>
							</div>
							<input
								type="file"
								id="file"
								className="hidden"
								onChange={editImage}
							/>
						</label>
					</div>

					<div className="flex gap-[8px] mt-[32px]">
						<div className="flex flex-col gap-[8px] flex-1">
							<p className="font-[400] text-[16px] leading-[1.5] text-[#38385B]">
								<b>About {title}:</b>{" "}
								{!editingAbout && <span className="font-[300]">{about}</span>}
							</p>

							<div className="flex">
								{editingAbout && (
									<Textarea
										value={about}
										onChange={(e) => setAbout(e.target.value)}
										className="border-[#FFCDE3] h-[150px] w-full mr-[8px]"
									/>
								)}

								{editingAbout && (
									<>
										<Button variant="ghost" size="icon" onClick={saveAbout}>
											<RiCheckFill className="text-[22px] fill-[#38385B]" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											onClick={cancelAboutEdit}>
											<RiCloseLine className="text-[22px] fill-[#38385B]" />
										</Button>
									</>
								)}
							</div>
						</div>

						{!editingAbout && (
							<div className="flex">
								<Button
									variant="ghost"
									size="icon"
									onClick={() => setEditingAbout(true)}>
									<RiEdit2Fill className="text-[22px] fill-[#38385B]" />
								</Button>
							</div>
						)}
					</div>
				</div>

				<div className="flex flex-col mt-[24px] w-full max-w-[900px] gap-[24px]">
					<div className="p-[12px] rounded-[12px] border border-[#FFD2D0] bg-[#FEFEFE] flex gap-[12px]">
						<div className="w-[140px] h-[140px]">
							<img
								src="/assets/woman.png"
								alt=""
								className="w-full h-full object-cover rounded-[12px]"
							/>
						</div>
						<div className="flex flex-col flex-1 pr-[48px]">
							<h3 className="font-[600] text-[14px] text-[#38385B]">
								MODULE 1
							</h3>
							<h4 className="font-[600] text-[14px] text-[#38385B] mt-[10px]">
								Life and career Omolara Oriye
							</h4>
							<p className="font-[400] text-[14px] text-[#38385B] mt-[10px]">
								<span className="font-[600]">Summary of Module:</span> Lorem
								ipsum dolor sit amet consectetur. Sed diam est tempus blandit
								eget diam. Nibh ac elit faucibus consequat tortor pretium. Sed
								nunc purus vel nulla quis volutpat pellentesque aliquam.
								Scelerisque erat ipsum mauris sed semper massa.
							</p>
						</div>
						<div className="flex flex-col justify-center gap-[12px]">
							<Button
								variant="ghost"
								size="icon"
								onClick={() =>
									navigate(
										`/${routes.human_books}/${routes.add_book}/${routes.add_module}/${routes.add_content}?book=bookId&module=moduleId`
									)
								}>
								<RiEdit2Fill className="text-[20px] fill-[#38385B]" />
							</Button>
							<Button variant="ghost" size="icon">
								<BiSolidTrash className="text-[20px] fill-[#38385B]" />
							</Button>
						</div>
					</div>
					<div className="p-[12px] rounded-[12px] border border-[#FFD2D0] bg-[#FEFEFE] flex gap-[12px]">
						<div className="w-[140px] h-[140px]">
							<img
								src="/assets/woman.png"
								alt=""
								className="w-full h-full object-cover rounded-[12px]"
							/>
						</div>
						<div className="flex flex-col flex-1 pr-[48px]">
							<h3 className="font-[600] text-[14px] text-[#38385B]">
								MODULE 2
							</h3>
							<h4 className="font-[600] text-[14px] text-[#38385B] mt-[10px]">
								Legacy of Omolara Oriye
							</h4>
							<p className="font-[400] text-[14px] text-[#38385B] mt-[10px]">
								<span className="font-[600]">Summary of Module:</span> Lorem
								ipsum dolor sit amet consectetur. Sed diam est tempus blandit
								eget diam. Nibh ac elit faucibus consequat tortor pretium. Sed
								nunc purus vel nulla quis volutpat pellentesque aliquam.
								Scelerisque erat ipsum mauris sed semper massa.
							</p>
						</div>
						<div className="flex flex-col justify-center gap-[12px]">
							<Button
								variant="ghost"
								size="icon"
								onClick={() =>
									navigate(
										`/${routes.human_books}/${routes.add_book}/${routes.add_module}/${routes.add_content}?book=bookId&module=moduleId`
									)
								}>
								<RiEdit2Fill className="text-[20px] fill-[#38385B]" />
							</Button>
							<Button variant="ghost" size="icon">
								<BiSolidTrash className="text-[20px] fill-[#38385B]" />
							</Button>
						</div>
					</div>
				</div>

				<Button className="mt-[24px]">
					<RiAddFill className="mr-[8px] text-[18px]" /> Add Module
				</Button>
			</div>
		</AppLayout>
	);
};

export default BookSummary;
