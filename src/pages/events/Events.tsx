import {
	AppLayout,
	PageHeaderWrapper,
	PageTitle,
} from "@/components/layouts/AppLayout";

const Events = () => {
	return (
		<AppLayout>
			<PageHeaderWrapper className="flex items-center justify-between">
				<PageTitle>Events</PageTitle>
			</PageHeaderWrapper>
		</AppLayout>
	);
};

export default Events;
