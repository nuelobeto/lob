import { routes } from "@/router/routes";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const SideNav = () => {
	const links = [
		{
			text: "Dashboard",
			url: `/${routes.dashboard}`,
		},
		{
			text: "Readers",
			url: `/${routes.readers}`,
		},
		{
			text: "Human Books",
			url: `/${routes.human_books}`,
		},
		{
			text: "Events",
			url: `/${routes.events}`,
		},
		{
			text: "Activity",
			url: `/${routes.activity}`,
		},
	];

	return (
		<nav className="w-[200px] h-full bg-[url('/assets/bg-pattern.svg')] bg-no-repeat bg-cover bg-center relative flex flex-col gap-[]">
			<div className="w-[180px] mx-auto p-[12px]">
				<img src="/assets/logo.svg" alt="" className="w-full block" />
			</div>

			<div className="pl-[12px] flex flex-col gap-[8px] pt-[64px] h-[calc(100%-180px-76px)]">
				{links.map((link, index) => (
					<NavLink
						key={index}
						to={link.url}
						className={({ isActive }) =>
							`h-[48px] px-[20px] flex items-center rounded-l-full font-[400] text-[14px] hover:bg-[#fff6fa9a] hover:text-[#38385B] hover:font-[500] ${
								isActive
									? "bg-[#FFF6FA] text-[#38385B] font-[500]"
									: "bg-transparent text-[#FFF6FA]"
							}`
						}>
						{link.text}
					</NavLink>
				))}
			</div>

			<div className="p-[12px] pb-[24px]">
				<Button
					variant="ghost"
					className="text-[#FFF6FA] hover:text-[#38385B] px-[20px] w-full justify-start">
					Log out
				</Button>
			</div>
		</nav>
	);
};

export default SideNav;
