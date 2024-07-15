/* eslint-disable react-refresh/only-export-components */
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

type Props = {
	setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
};
type DropdownProps = React.HTMLAttributes<HTMLDivElement> & Props;

const Dropdown = ({
	className,
	children,
	setShowDropdown,
	...props
}: DropdownProps) => {
	const dropdownRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				!dropdownRef.current.parentElement?.contains(event.target as Node)
			) {
				setShowDropdown(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropdownRef, setShowDropdown]);

	return (
		<div
			className={cn("min-w-[150px] absolute z-50", className)}
			{...props}
			ref={dropdownRef}>
			{children}
		</div>
	);
};

export { Dropdown };
