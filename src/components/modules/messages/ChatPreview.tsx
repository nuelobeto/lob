const ChatPreview = () => {
	const truncateText = (text: string) => {
		if (text.length <= 30) {
			return text;
		}
		return text.substring(0, 25) + "...";
	};

	return (
		<div className="flex items-center gap-[12px]">
			<img
				src="/assets/default_pic.png"
				alt=""
				className="w-[48px] h-[48px] rounded-full block object-cover"
			/>
			<div className="flex-1">
				<div className="flex items-center justify-between text-[14px]">
					<p className="max-w-[180px] overflow-hidden text-[#38385B]">
						Lorem ipsum
					</p>
					<p className="text-[12px] text-[#38385B] font-[500]">4:31 PM</p>
				</div>

				<div className="flex items-center justify-between text-[12px]">
					<p className="font-[300] max-w-[180px] overflow-hidden text-[#828282]">
						{truncateText(
							"Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, enim!"
						)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ChatPreview;
