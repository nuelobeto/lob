import { cn } from "@/lib/utils";

const AuthLayout = ({ children }: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div className="w-screen h-screen bg-[#2D314C] relative">
			<div className="bg-[url('/assets/authbg1.svg')] bg-no-repeat bg-contain bg-top absolute  w-full h-full top-0 left-0"></div>
			<div className="absolute w-full h-full z-10 top-0 left-0 flex items-center justify-center p-[20px]">
				{children}
			</div>
			<div className="bg-[url('/assets/authbg2.svg')] bg-no-repeat bg-contain bg-bottom z-1 absolute w-full h-full top-0 left-0"></div>
		</div>
	);
};

const AuthForm = ({ children }: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div className="w-full max-w-[500px] mx-auto pt-[30px] pb-[50px] px-[20px] rounded-[24px] border-[3px] border-[#F9AD24] bg-[#FFF6FA] flex flex-col items-center">
			{children}
		</div>
	);
};

const AuthLogo = () => {
	return (
		<div className="w-[80px] flex flex-col items-center">
			<img src="/assets/logo-blue.png" alt="" className="w-full block" />
		</div>
	);
};

const AuthTitle = ({
	children,
	className,
}: React.HTMLAttributes<HTMLHeadingElement>) => {
	return (
		<h1
			className={cn(
				"font-[400] text-[30px] text-[#525383] abril-font",
				className
			)}>
			{children}
		</h1>
	);
};

const AuthSubTitle = ({
	children,
	className,
}: React.HTMLAttributes<HTMLHeadingElement>) => {
	return (
		<h1 className={cn("font-[400] text-[14px] text-[#667085]", className)}>
			{children}
		</h1>
	);
};
export { AuthLayout, AuthForm, AuthLogo, AuthTitle, AuthSubTitle };
