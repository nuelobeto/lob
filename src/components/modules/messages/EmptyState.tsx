import { Button } from "@/components/ui/button";

const EmptyState = () => {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<div className="w-full max-w-[350px] mx-auto flex flex-col items-center justify-center">
				<h2 className="font-[600] text-[30px] text-[#38385B] mb-[6px] text-center">
					Select a message
				</h2>
				<p className="font-[300] text-[16px] text-[#38385B] mb-[20px] text-center">
					Choose from your existing conversations or start a new one.
				</p>
				<Button>New message</Button>
			</div>
		</div>
	);
};

export default EmptyState;
