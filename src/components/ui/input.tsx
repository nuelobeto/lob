import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement>,
		ExtraProps {}

interface ExtraProps {
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	onClickLeft?: () => void;
	onClickRight?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			type,
			leftIcon,
			rightIcon,
			onClickLeft,
			onClickRight,
			...props
		},
		ref
	) => {
		return (
			<div className="w-full flex items-center relative">
				{leftIcon && (
					<button
						type="button"
						className="absolute left-[14px] w-[20px] h-[20px] flex items-center justify-center"
						onClick={onClickLeft}>
						{leftIcon}
					</button>
				)}

				<input
					type={type}
					className={cn(
						"flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-[14px] text-[#38385B] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
						className,
						leftIcon ? "pl-[42px]" : "pl-[14px]",
						rightIcon ? "pr-[42px]" : "pr-[14px]"
					)}
					ref={ref}
					{...props}
				/>

				{rightIcon && (
					<button
						type="button"
						className="absolute right-[14px] w-[20px] h-[20px] flex items-center justify-center"
						onClick={onClickRight}>
						{rightIcon}
					</button>
				)}
			</div>
		);
	}
);
Input.displayName = "Input";

export { Input };
