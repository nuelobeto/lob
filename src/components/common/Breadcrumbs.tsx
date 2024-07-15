import { Link, useLocation } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";

const Breadcrumbs = () => {
	const { pathname } = useLocation();

	const capitalizeAndSeparate = () => {
		const segments = pathname.split("/").filter((link) => link);

		return segments.map((link, index) => {
			const url = `${segments.slice(0, index + 1).join("/")}`;
			const text = link
				.split("-")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" ");

			return { text, url };
		});
	};

	const separatedLinks = capitalizeAndSeparate();

	return (
		<div className="flex items-center mb-[12px]">
			{separatedLinks.map((link, index) => (
				<div key={index} className="flex items-center">
					{index > 0 && (
						<RiArrowRightSLine className="text-[18px] fill-[#8E98A8] mx-[8px]" />
					)}
					<Link
						to={`/${link.url}`}
						className="font-[400] text-[13px] text-[#8E98A8]">
						{link.text}
					</Link>
				</div>
			))}
		</div>
	);
};

export default Breadcrumbs;
