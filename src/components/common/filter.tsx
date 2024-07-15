import { MdArrowDropDown } from "react-icons/md";
import { Button } from "../ui/button";
import { Dropdown } from "../ui/custom-dropdown";
import { useState } from "react";

type Props = {
	criterion: string;
	setCriterion: React.Dispatch<React.SetStateAction<string>>;
	criteria: string[];
	label: string;
};

export const Filter = ({ criteria, criterion, setCriterion, label }: Props) => {
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<div className="relative">
			<Button
				variant="outline"
				className="flex items-center gap-[8px]"
				onClick={() => setShowDropdown(!showDropdown)}>
				<span className="text-[14px] leading-[1.5] font-[400]">{label}:</span>
				<span className="text-[14px] leading-[1.5] font-[400] text-[#959595]">
					{criterion}
				</span>
				<MdArrowDropDown className="text-[20px] ml-[48px]" />
			</Button>

			{showDropdown && (
				<Dropdown
					setShowDropdown={setShowDropdown}
					className="w-full flex flex-col gap-[4px] p-[6px] rounded-[6px] bg-white shadow-xl border border-gray-100 right-0 top-[45px]">
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
	);
};
