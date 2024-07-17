import { AppLayout, PageTitle } from "@/components/layouts/AppLayout";
import { Outlet } from "react-router-dom";

const Forum = () => {
	return (
		<AppLayout>
			<div className="flex absolute w-full h-full top-0 left-0">
				<div className="w-[300px] bg-white px-[20px]">
					<div className="w-full h-[70px] flex items-center">
						<PageTitle>discussion forums</PageTitle>
					</div>

					<div className="w-full h-[calc(100%-70px)] py-[20px] flex flex-col gap-[16px] overflow-hidden">
						<div className="flex items-center justify-between">
							<p className="font-[400] text-[14px] text-[#38385B]">
								Freda Adebanjo
							</p>
							<div className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#BBDDD9] text-[#38385B] font-[300] text-[12px]">
								10
							</div>
						</div>
					</div>
				</div>

				<div className="flex-1 bg-[#FFF6FA]">
					<Outlet />
				</div>
			</div>
		</AppLayout>
	);
};

export default Forum;
