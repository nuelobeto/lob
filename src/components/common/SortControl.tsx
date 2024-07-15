import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { Button } from "../ui/button";
import { Dropdown } from "../ui/custom-dropdown";
import { RiArrowUpDownFill } from "react-icons/ri";

type Props = {
	criterion: string;
	setCriterion: React.Dispatch<React.SetStateAction<string>>;
	criteria: string[];
	showLabel?: boolean;
};

export const SortControl = ({
	criteria,
	criterion,
	setCriterion,
	showLabel,
}: Props) => {
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<div className="flex">
			{showLabel && (
				<p className="flex items-center whitespace-nowrap text-[14px]">
					<RiArrowUpDownFill className="mr-[4px]" />
					Sort by:
				</p>
			)}
			<div className="relative">
				<Button
					size="xs"
					variant="ghost"
					className="flex items-center gap-[8px]"
					onClick={() => setShowDropdown(!showDropdown)}>
					<span className="text-[14px] leading-[1.5] font-[400] text-[#959595]">
						{criterion}
					</span>
					<MdArrowDropDown className="text-[20px]" />
				</Button>

				{showDropdown && (
					<Dropdown
						setShowDropdown={setShowDropdown}
						className="flex flex-col gap-[4px] p-[6px] rounded-[6px] bg-white shadow-xl border border-gray-100 right-0 top-[35px]">
						{criteria.map((criterion, index) => (
							<Button
								key={index}
								variant="ghost"
								className="whitespace-nowrap text-[14px] justify-start h-[32px] font-[400]"
								onClick={() => {
									setCriterion(criterion);
									setShowDropdown(false);
								}}>
								{criterion}
							</Button>
						))}
					</Dropdown>
				)}
			</div>
		</div>
	);
};
