import { useNavigate } from "react-router-dom";
import { routes } from "@/router/routes";
import { Button } from "@/components/ui/button";

const EmptyState = () => {
	const navigate = useNavigate();

	return (
		<div className="max-w-[758px] w-full mx-auto bg-white py-[48px] px-[20px] rounded-[24px] shadow-xl border border-gray-100 flex flex-col items-center mt-[80px]">
			<div className="w-[160px]">
				<img src="/assets/empty-readers.png" alt="" className="w-full block" />
			</div>

			<p className="font-[400] text-[16px] leading-[2] text-[#202123] text-center mt-[32px]">
				No courses yet. Add a course.
			</p>

			<p className="font-[400] text-[14px] leading-[2] text-[#202123] text-center">
				This is where you create and manage your course
			</p>

			<div className="flex justify-center gap-[12px] mt-[32px]">
				<Button
					onClick={() =>
						navigate(`/${routes.readers}/${routes.invite_readers}`)
					}>
					Add course
				</Button>
			</div>
		</div>
	);
};

export default EmptyState;
