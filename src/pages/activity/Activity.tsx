import {
	AppLayout,
	PageHeaderWrapper,
	PageTitle,
} from "@/components/layouts/AppLayout";

const Activity = () => {
	return (
		<AppLayout>
			<PageHeaderWrapper className="flex items-center justify-between">
				<PageTitle>Activity</PageTitle>
			</PageHeaderWrapper>
		</AppLayout>
	);
};

export default Activity;
