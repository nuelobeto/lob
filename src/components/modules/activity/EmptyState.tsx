const EmptyState = () => {
	return (
		<div className="max-w-[758px] w-full mx-auto bg-white py-[48px] px-[20px] rounded-[24px] shadow-xl border border-gray-100 flex flex-col items-center mt-[80px]">
			<div className="w-[160px]">
				<img src="/assets/empty-readers.png" alt="" className="w-full block" />
			</div>

			<p className="font-[400] text-[16px] leading-[2] text-[#202123] text-center mt-[32px]">
				No Activity
			</p>

			<p className="font-[400] text-[14px] leading-[2] text-[#202123] text-center">
				This is where you view all the activity you have done
			</p>
		</div>
	);
};

export default EmptyState;
