import { PageTitle } from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useQuery from "@/hooks/useQuery";
import { RiCloseFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { RiSendPlaneFill } from "react-icons/ri";

const TicketDetails = () => {
	const tickedId = useQuery().get("ticketId");
	const navigate = useNavigate();

	return (
		<div
			className={`w-full h-full bg-black/50 fixed top-0 left-0 flex justify-end transition-all duration-500 ${
				tickedId
					? "pointer-events-auto opacity-1"
					: "opacity-0 pointer-events-none"
			}`}
			onClick={() => navigate(-1)}>
			<div
				className={`w-[600px] h-full bg-white transition-all duration-500 ${
					tickedId ? "translate-x-0" : "translate-x-full"
				}`}
				onClick={(e) => e.stopPropagation()}>
				<div className="w-full bg-[#F4F9FD] px-[20px] pb-[12px] border-b">
					<div className="h-[60px] border-b border-[#BDBDBD] flex items-center justify-between">
						<PageTitle>Support</PageTitle>
						<Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
							<RiCloseFill className="text-[22px]" />
						</Button>
					</div>
					<div className="flex items-center justify-between pt-[12px]">
						<h2 className="font-[400] text-[24px] text-[#033132]">
							#1015674KHJ
						</h2>
						<span className="uppercase text-[10px] font-[400] bg-[#F2C94C] rounded-full py-[4px] px-[16px]">
							Open Ticket
						</span>
					</div>
					<div className="flex items-center justify-between pt-[12px]">
						<div className="flex flex-col gap-[8px]">
							<p className="font-[400] text-[12px] text-[#033132] underline underline-offset-1">
								Okoro Nneka
							</p>
							<p className="font-[400] text-[10px] text-[#033132]">11:27AM</p>
						</div>
						<div className="flex flex-col gap-[8px]">
							<p className="font-[400] text-[12px] text-[#033132] underline underline-offset-1">
								Ticket Title
							</p>
							<p className="font-[400] text-[16px] text-[#252733]">
								Video is not Playing
							</p>
						</div>
					</div>
					<div className="flex justify-center">
						<Button
							variant="outline"
							className="w-[200px] rounded-full bg-transparent uppercase text-[12px]">
							Close Ticket
						</Button>
					</div>
					<div className="pt-[12px]">
						<Button
							variant="outline"
							className="text-[10px] bg-transparent rounded-full h-[24px]">
							Comments (0)
						</Button>
					</div>
				</div>
				<div className="h-[calc(100%-260px-70px)] overflow-hidden"></div>
				<div className="h-[70px] border-t border-[#E0E0E0] px-[20px] flex items-center">
					<Input
						placeholder="Send a Feedback"
						rightIcon={<RiSendPlaneFill />}
					/>
				</div>
			</div>
		</div>
	);
};

export default TicketDetails;
