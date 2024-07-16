import {
	AppLayout,
	PageHeaderDivider,
	PageHeaderWrapper,
	PageTitle,
} from "@/components/layouts/AppLayout";
import EmptyState from "@/components/modules/activity/EmptyState";

const Activity = () => {
	return (
		<AppLayout>
			<PageHeaderWrapper className="flex items-center justify-between">
				<PageTitle>Activity (0)</PageTitle>
			</PageHeaderWrapper>

			<PageHeaderDivider />

			<EmptyState />
		</AppLayout>
	);
};

export default Activity;
