import { AppLayout } from "@/components/layouts/AppLayout";
import { Outlet } from "react-router-dom";

const Messages = () => {
	return (
		<AppLayout>
			<div className="flex absolute w-full h-full top-0 left-0">
				<div className="w-[350px] bg-white border-r"></div>

				<div className="flex-1 bg-white">
					<Outlet />
				</div>
			</div>
		</AppLayout>
	);
};

export default Messages;
