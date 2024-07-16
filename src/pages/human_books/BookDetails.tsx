import Breadcrumbs from "@/components/common/Breadcrumbs";
import BookIcon from "@/components/icons/BookIcon";
import LanguageIcon from "@/components/icons/LanguageIcon";
import ModuleIcon from "@/components/icons/ModuleIcon";
import {
	AppLayout,
	PageHeaderWrapper,
	PageTitle,
	PageHeaderDivider,
} from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import useQuery from "@/hooks/useQuery";
import { useEffect, useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";

const BookDetails = () => {
	const [progress, setProgress] = useState(0);
	const bookId = useQuery().get("book");

	console.log(bookId);

	useEffect(() => {
		const timer = setTimeout(() => setProgress(70), 500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<AppLayout>
			<PageHeaderWrapper className="flex flex-col">
				<div className="flex">
					<Breadcrumbs />
					<RiArrowRightSLine className="text-[18px] fill-[#8E98A8] mx-[8px]" />
					<span className="font-[400] text-[13px] text-[#8e98a88b]">
						Omolara Oriye
					</span>
				</div>
				<div className="flex items-center justify-between">
					<PageTitle>Human Book Details</PageTitle>
				</div>
			</PageHeaderWrapper>

			<PageHeaderDivider />

			<div className="mt-[32px]">
				<h2 className="font-[600] text-[18px] text-[#38385B] mb-[24px]">
					Omolara Oriye
				</h2>

				<div className="flex justify-between">
					<div className="flex gap-[24px]">
						<div className="w-[280px]">
							<img
								src="/assets/woman.png"
								alt=""
								className="w-full block rounded-[16px]"
							/>
						</div>
						<div className="flex flex-col">
							<h3 className="font-[600] text-[14px] text-[#38385B] mb-[12px]">
								DETAILS:
							</h3>
							<p className="font-[300] text-[14px] text-[#38385B] mb-[12px] flex items-center gap-[18px]">
								<LanguageIcon /> English, French, Swahili
							</p>
							<p className="font-[300] text-[14px] text-[#38385B] mb-[12px] flex items-center gap-[18px]">
								<ModuleIcon /> English, French, Swahili
							</p>
							<p className="font-[300] text-[14px] text-[#38385B] mb-[12px] flex items-center gap-[18px]">
								<BookIcon /> English, French, Swahili
							</p>
						</div>
					</div>

					<div className="flex flex-col gap-[12px]">
						<Button className="w-[190px]">View Readers</Button>
						<Button className="w-[190px]">Edit Course</Button>
						<Button className="w-[190px]">Delete Course</Button>
					</div>
				</div>

				<div className="flex gap-[24px] mt-[32px]">
					<div className="flex-1 border border-[#FFDEDE] bg-white p-[20px] rounded-[16px]">
						<h3 className="font-[500] text-[16px] text-[#38385B] mb-[12px]">
							About Omolara Oriye
						</h3>
						<p className="font-[400] text-[14px] text-[#38385B]">
							Omolara Oriye is a prominent Nigerian feminist, human rights
							activist, and social entrepreneur dedicated to advancing gender
							equality and empowering women across Africa. Born in Lagos,
							Nigeria, Omolara grew up witnessing the pervasive gender
							inequalities that hinder the progress of women and girls. This
							early exposure to social injustices fueled her passion for
							advocacy and social change.
						</p>
					</div>

					<div className="w-[400px] p-[20px] rounded-[16px] border border-[#FFDEDE] bg-white">
						<h3 className="font-[500] text-[16px] text-[#38385B] mb-[12px]">
							Human Book Analytics
						</h3>
						<div className="flex flex-col gap-[8px]">
							<p className="text-[12px] flex items-center gap-[12px]">
								<span className="font-[500] uppercase text-[#A5A5A5] text-[10px]">
									Total watch hours:
								</span>
								<span className="font-[500] text-[#38385B]">100hrs</span>
							</p>
							<p className="text-[12px] flex items-center gap-[12px]">
								<span className="font-[500] uppercase text-[#A5A5A5] text-[10px]">
									Number of Readers:
								</span>
								<span className="font-[500] text-[#38385B]">25</span>
							</p>
							<div>
								<p className="text-[12px]">
									<span className="font-[500] uppercase text-[#A5A5A5] text-[10px]">
										completion rate:
									</span>
								</p>
								<div className="w-[300px] flex items-center gap-[12px] mt-[4px]">
									<Progress
										value={progress}
										className="flex-1 h-[6px] bg-[#C6C6C6]"
									/>
									<span className="text-[#38385B] text-[12px] font-[500]">
										{progress}%
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AppLayout>
	);
};

export default BookDetails;
