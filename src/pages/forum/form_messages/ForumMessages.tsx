import { routes } from "@/router/routes";
import { useEffect } from "react";
import {
	NavLink,
	Outlet,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";

const ForumMessages = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const params = useParams();

	const navlinks = [
		{
			url: `/${routes.forum}/${params.forumId}/${routes.forum_comments}`,
			text: "Comments",
		},
		{
			url: `/${routes.forum}/${params.forumId}/${routes.forum_flagged_comments}`,
			text: "Flagged comments",
		},
	];

	useEffect(() => {
		if (pathname === `/${routes.forum}/${params.forumId}`) {
			navigate(`/${routes.forum}/${params.forumId}/${routes.forum_comments}`);
		}
	}, [navigate, params, pathname]);

	return (
		<div className="w-full h-full">
			<div className="w-full px-[30px] pt-[24px]">
				<div className="flex gap-[64px] border-b border-[#80948A]">
					{navlinks.map((link, index) => (
						<NavLink
							key={index}
							to={link.url}
							className={({ isActive }) =>
								`text-[16px] text-[#38385B] border-b-2 mb-[-1px] pb-[12px] ${
									isActive ? "border-[#FC8619]" : "border-transparent"
								}`
							}>
							{link.text}
						</NavLink>
					))}
				</div>
			</div>
			<Outlet />
		</div>
	);
};

export default ForumMessages;
