import { NavLink } from "react-router-dom";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MailIcon from "../icons/MailIcon";
import GroupIcon from "../icons/GroupIcon";
import SettingsIcon from "../icons/SettingsIcon";
import SupportIcon from "../icons/SupportIcon";
import SearchIcon from "../icons/SearchIcon";
import NotificationIcon from "../icons/NotificationIcon";

const Topbar = () => {
	const links1 = [
		{
			url: "",
			icon: <SettingsIcon />,
		},
		{
			url: "",
			icon: <MailIcon />,
		},
		{
			url: "",
			icon: <GroupIcon />,
		},
		{
			url: "",
			icon: <SupportIcon />,
		},
	];

	return (
		<nav className="w-full bg-[#38385B]">
			<div className="w-full max-w-[1500px] h-[60px] mx-auto flex items-center justify-between px-[30px]">
				<div className="flex items-center gap-[24px]">
					{links1.map((link, index) => (
						<NavLink
							key={index}
							to={link.url}
							className="nav-link w-[22px] h-[22px]">
							{link.icon}
						</NavLink>
					))}
				</div>

				<div className="flex-1 max-w-[500px]">
					<Input
						type="search"
						placeholder="Search"
						leftIcon={<SearchIcon />}
						className="border-[#FFF6FA] bg-[#31314f] placeholder:text-[#8c8c8c] text-[#FFF6FA]"
					/>
				</div>

				<div className="flex items-center gap-[24px]">
					<NavLink to={`/`} className="w-[22px] h-[22px]">
						<NotificationIcon />
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
