import { NavLink } from "react-router-dom";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { routes } from "@/router/routes";
import { RiSettings3Fill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { MdGroups2 } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { RiNotification3Fill } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";

const Topbar = () => {
	const links = [
		{
			url: `/${routes.settings}`,
			icon: <RiSettings3Fill />,
		},
		{
			url: `/${routes.messages}`,
			icon: <MdEmail />,
		},
		{
			url: "/",
			icon: <MdGroups2 />,
		},
		{
			url: "/",
			icon: <BiSupport />,
		},
	];

	return (
		<nav className="w-full bg-[#38385B]">
			<div className="w-full max-w-[1500px] h-[60px] mx-auto flex items-center justify-between px-[30px]">
				<div className="flex items-center gap-[24px]">
					{links.map((link, index) => (
						<NavLink
							key={index}
							to={link.url}
							className={({ isActive }) =>
								`text-[26px] ${isActive ? "text-[#FC8619]" : "text-[#FFF6FA]"}`
							}>
							{link.icon}
						</NavLink>
					))}
				</div>

				<div className="flex-1 max-w-[500px]">
					<Input
						type="search"
						placeholder="Search"
						leftIcon={
							<MdOutlineSearch className="text-[22px] text-[#FFF6FA]" />
						}
						className="border-[#FFF6FA] bg-[#31314f] placeholder:text-[#8c8c8c] text-[#FFF6FA]"
					/>
				</div>

				<div className="flex items-center gap-[24px]">
					<NavLink to={`/`} className="w-[22px] h-[22px]">
						<RiNotification3Fill className="text-[26px] text-[#FFF6FA]" />
					</NavLink>
					<div className="flex items-center gap-[16px]">
						<p className="text-[14px] text-[#FFF6FA]">Admin</p>
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Topbar;
