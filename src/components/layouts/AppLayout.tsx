import SideNav from "./Sidenav";
import Topbar from "./Topbar";
import { cn } from "@/lib/utils";

type AppLayoutProps = {
	children: React.ReactNode;
};
export const AppLayout = ({ children }: AppLayoutProps) => {
	return (
		<div className="w-screen h-screen flex bg-[#1F1F39]">
			<SideNav />
			<main className="flex-1 h-full p-[8px] pl-0">
				<div className="w-full h-full rounded-[4px] overflow-hidden">
					<Topbar />
					<div className="w-full h-[calc(100%-60px)] bg-[#FFF6FA] relative">
						<div className="w-full max-w-[1500px] mx-auto h-full px-[30px] pt-[16px] pb-[48px] overflow-auto hide-scroll">
							{children}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export const PageTitle = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
	return (
		<h1
			className={cn(
				"font-[600] text-[20px] leading-[1.56] text-[#38385B]",
				className
			)}
			{...props}>
			{children}
		</h1>
	);
};

export const PageHeaderWrapper = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div className={cn("pb-[24px]", className)} {...props}>
			{children}
		</div>
	);
};

export const PageHeaderDivider = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div className={cn("w-full h-[1px] bg-[#80948A]", className)} {...props}>
			{children}
		</div>
	);
};
