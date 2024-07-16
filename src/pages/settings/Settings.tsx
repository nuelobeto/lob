import Breadcrumbs from "@/components/common/Breadcrumbs";
import {
	AppLayout,
	PageHeaderDivider,
	PageHeaderWrapper,
	PageTitle,
} from "@/components/layouts/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { routes } from "@/router/routes";
import { useEffect } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

const Settings = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const navlinks = [
		{
			title: "Personal information",
			description:
				"Change/verify your email address, and set your profile picture.",
			url: `/${routes.settings}/${routes.personalInfo}`,
		},
		{
			title: "Account security",
			description:
				"Change your password, connected Apps, Two-Factor Authentication",
			url: `/${routes.settings}/${routes.account_security}`,
		},
		{
			title: "Notification",
			description:
				"Updates, Newsletter, period based summary report, change notification email, reports",
			url: `/${routes.settings}/${routes.notification}`,
		},
		{
			title: "Create and manage roles",
			description: "Create and manage different roles with permissions",
			url: `/${routes.settings}/${routes.roles}`,
		},
	];

	useEffect(() => {
		if (pathname === `/${routes.settings}`) {
			navigate(`/${routes.settings}/${routes.personalInfo}`);
		}
	}, [navigate, pathname]);

	return (
		<AppLayout>
			<PageHeaderWrapper>
				<Breadcrumbs />
				<PageTitle>Settings</PageTitle>
			</PageHeaderWrapper>

			<PageHeaderDivider />

			<div className="flex mt-[36px] gap-[48px]">
				<div className="w-[400px]">
					<div className="flex-1 flex items-center gap-[16px] p-[20px] rounded-[16px] bg-[#BBDDD9]">
						<Avatar className="w-[80px] h-[80px]">
							<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div className="flex flex-col">
							<h4 className="font-[500] text-[21px] leading-[1.50] text-[#38385B]">
								Master Admin
							</h4>
							<p className="font-[400] text-[15px] leading-[1.57] text-[#38385B]">
								Administrator
							</p>
							<p className="font-[500] text-[14px] leading-[1.57] text-[#38385B]">
								johndoe.admin@businessemail.com
							</p>
						</div>
					</div>

					<div className="flex flex-col mt-[36px] gap-[14px]">
						{navlinks.map((link, index) => (
							<NavLink
								key={index}
								to={link.url}
								className={({ isActive }) =>
									`p-[20px]  ${
										isActive
											? "bg-[#38385B] text-[#FEFEFE]"
											: "bg-white text-[#1D1D1D]"
									}`
								}>
								<div className="flex items-center justify-between">
									<h4 className="font-[500] text-[16px]">{link.title}</h4>
									<RiArrowRightSLine className="text-[22px]" />
								</div>
								<p
									className={`font-[300] text-[14px] leading-[1.5] w-[90%] mt-[8px] ${
										pathname.includes(link.url)
											? "text-[#FEFEFE]"
											: "text-[#828282]"
									}`}>
									{link.description}
								</p>
							</NavLink>
						))}
					</div>
				</div>

				<div className="flex-1">
					<Outlet />
				</div>
			</div>
		</AppLayout>
	);
};

export default Settings;
