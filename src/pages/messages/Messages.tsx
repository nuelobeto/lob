import { AppLayout, PageTitle } from "@/components/layouts/AppLayout";
import { Input } from "@/components/ui/input";
import { Outlet } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { FiEdit } from "react-icons/fi";
import ChatPreview from "@/components/modules/messages/ChatPreview";

const Messages = () => {
	return (
		<AppLayout>
			<div className="flex absolute w-full h-full top-0 left-0">
				<div className="w-[350px] bg-white border-r px-[20px]">
					<div className="w-full h-[70px] flex items-center justify-between">
						<PageTitle>Messages</PageTitle>
						<div className="flex items-center">
							<Button variant="ghost" size="icon">
								<BsThreeDots className="text-[18px]" />
							</Button>
							<Button variant="ghost" size="icon">
								<FiEdit className="text-[18px]" />
							</Button>
						</div>
					</div>
					<Input
						placeholder="Search  Messages"
						leftIcon={<MdOutlineSearch className="text-[#80948A]" />}
						className="bg-gray-200"
					/>
					<div className="w-full h-[calc(100%-70px-40px)] pt-[40px] pb-[20px] flex flex-col gap-[16px] overflow-hidden">
						<ChatPreview />
					</div>
				</div>

				<div className="flex-1 bg-white">
					<Outlet />
				</div>
			</div>
		</AppLayout>
	);
};

export default Messages;
