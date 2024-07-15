import {
	AppLayout,
	PageHeaderWrapper,
	PageTitle,
} from "@/components/layouts/AppLayout";
import { getDateInMMDDYY } from "@/lib/helpers";
import { Pie, PieChart, Line, LineChart, XAxis } from "recharts";
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SortControl } from "@/components/common/SortControl";

const Dashboard = () => {
	return (
		<AppLayout>
			<PageHeaderWrapper className="flex items-center justify-between">
				<PageTitle>Dashboard</PageTitle>
				<p className="font-[400] text-[16px] leading-[1.5]">
					{getDateInMMDDYY()}
				</p>
			</PageHeaderWrapper>

			<div className="flex gap-[24px]">
				<div className="flex-1 flex flex-col gap-[18px]">
					<div className="flex gap-[18px]">
						<Metric icon="/assets/person.svg" name="Readers" value="146" />
						<Metric icon="/assets/grad-hat.svg" name="Human Book" value="20" />
						<Metric
							icon="/assets/chart.svg"
							name="Completion rate"
							value="40.6%"
						/>
					</div>

					<div className="flex gap-[18px]">
						<div className="flex-1 flex flex-col gap-[18px]">
							<ReaderDemographic />
							<Updates />
							<HumanBookActivities />
						</div>
						<div className="flex-1 flex flex-col gap-[18px]">
							<Enrollment />
							<ReaderActivities />
						</div>
					</div>
				</div>

				<div className="w-[280px] flex flex-col gap-[18px]">
					<Activities />
					<Events />
				</div>
			</div>
		</AppLayout>
	);
};

export default Dashboard;

const Metric = ({
	icon,
	name,
	value,
}: {
	icon: string;
	name: string;
	value: string;
}) => {
	return (
		<div className="flex-1 flex items-center gap-[16px] p-[20px] rounded-[16px] bg-white">
			<div className="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-[#BBDDD9]">
				<img src={icon} alt="" />
			</div>
			<div className="flex flex-col">
				<h4 className="font-[400] text-[14px] leading-[1.57] text-[#38385B]">
					{name}
				</h4>
				<p className="font-[600] text-[21px] leading-[1.50] text-[#38385B]">
					{value}
				</p>
			</div>
		</div>
	);
};

const ReaderDemographic = () => {
	const [dateRange, setDateRange] = useState("Last 30 days");
	const dateRanges = [
		"Last 7 days",
		"Last 30 days",
		"Last 6 months",
		"Last 12 months",
	];

	const chartData = [
		{ ageRange: "18 - 24", value: 18.5, fill: "#38385B" },
		{ ageRange: "25 - 34", value: 18.5, fill: "#FC8619" },
		{ ageRange: "35 - 60", value: 63, fill: "#BBDDD9" },
	];

	const chartConfig = {
		"18 - 24": {
			label: "18 - 24 yrs old",
			color: "#38385B",
		},
		"25 - 34": {
			label: "25 - 34 yrs old",
			color: "#FC8619",
		},
		"35 - 60": {
			label: "35 - 60 yrs old",
			color: "#BBDDD9",
		},
	} satisfies ChartConfig;

	return (
		<div className="bg-white p-[20px] rounded-[16px]">
			<div className="flex items-center justify-between">
				<h3 className="font-[600] text-[14px] leading-[1.57] text-[#38385B]">
					Reader demographic
				</h3>
				<SortControl
					setCriterion={setDateRange}
					criterion={dateRange}
					criteria={dateRanges}
				/>
			</div>

			<ChartContainer
				config={chartConfig}
				className="w-full aspect-square max-h-[300px]">
				<PieChart className="">
					<Pie data={chartData} dataKey="value" />
					<ChartLegend content={<ChartLegendContent nameKey="ageRange" />} />
				</PieChart>
			</ChartContainer>
		</div>
	);
};

const Updates = () => {
	const [dateRange, setDateRange] = useState("Last 30 days");
	const dateRanges = [
		"Last 7 days",
		"Last 30 days",
		"Last 6 months",
		"Last 12 months",
	];

	const updates = [
		{
			title: "Highest enrollment",
			text: "Omolara Oriye",
		},
		{
			title: "Most active Reader",
			text: "Lara Obi",
		},
		{
			title: "Highest score",
			text: "1023 by Ayaba Olonishakin",
		},
	];

	return (
		<div className="bg-white p-[20px] rounded-[16px]">
			<div className="flex items-center justify-between">
				<h3 className="font-[600] text-[14px] leading-[1.57] text-[#38385B]">
					Updates
				</h3>
				<SortControl
					setCriterion={setDateRange}
					criterion={dateRange}
					criteria={dateRanges}
				/>
			</div>

			<div className="flex flex-col gap-[12px] mt-[24px]">
				{updates.map((update, index) => (
					<p key={index} className="font-[400] text-[12px]">
						<span className="font-[500] text-[#38385B]">{update.title}:</span>{" "}
						<span className="text-[#80948A]">{update.text}</span>
					</p>
				))}
			</div>
		</div>
	);
};

const HumanBookActivities = () => {
	const activities = [
		{
			text: "Admin added 2 new modules to Omolara Oriye",
			date: "May 7, 2024",
		},
		{
			text: "Admin added 2 new modules to Omolara Oriye",
			date: "May 7, 2024",
		},
		{
			text: "Admin added 2 new modules to Omolara Oriye",
			date: "May 7, 2024",
		},
	];

	return (
		<div className="bg-white p-[20px] rounded-[16px]">
			<div className="flex items-center justify-between">
				<h3 className="font-[600] text-[14px] leading-[1.57] text-[#38385B]">
					Human Book Activities
				</h3>

				<Button
					size="xs"
					variant="ghost"
					className="font-[400] text-[12px] text-[#959595]">
					See More
				</Button>
			</div>

			<div className="flex flex-col gap-[12px] mt-[24px]">
				{activities.map((activity, index) => (
					<div key={index} className="flex justify-between gap-[24px]">
						<p className="font-[400] text-[12px] text-[#38385B]">
							{activity.text}
						</p>
						<p className="font-[400] text-[12px] text-[#38385B] whitespace-nowrap">
							{activity.date}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

const Enrollment = () => {
	const [activeTab, setActiveTab] = useState("day");
	const tabs = ["day", "month"];
	const chartData = [
		{ month: "January", desktop: 186 },
		{ month: "February", desktop: 305 },
		{ month: "March", desktop: 237 },
		{ month: "April", desktop: 73 },
		{ month: "May", desktop: 209 },
		{ month: "June", desktop: 214 },
	];
	const chartConfig = {
		desktop: {
			label: "Desktop",
			color: "#000000",
		},
	} satisfies ChartConfig;

	return (
		<div className="bg-white py-[20px] rounded-[16px]">
			<div className="flex items-center justify-between px-[20px]">
				<div className="flex flex-col">
					<h3 className="font-[600] text-[14px] leading-[1.57] text-[#38385B]">
						Enrollment
					</h3>
					<h4 className="font-[400] text-[12px] leading-[1.5]">
						January’ 24 Cohort
					</h4>
				</div>
				<div className="flex gap-[4px]">
					{tabs.map((tab, index) => (
						<Button
							key={index}
							size="xs"
							variant={activeTab === tab ? "gray" : "ghost"}
							className="font-[400]"
							onClick={() => setActiveTab(tab)}>
							{tab}
						</Button>
					))}
				</div>
			</div>

			<div className="mt-[12px] px-[20px] bg-[#E9EBF8] py-[12px]">
				<ChartContainer config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}>
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Line
							dataKey="desktop"
							type="linear"
							stroke="var(--color-desktop)"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</div>

			<div className="mt-[12px] px-[20px]">
				<div className="flex justify-between">
					<div className="flex flex-col">
						<p className="font-[400] text-[12px] leading-[1.57] text-[#38385B] mt-[6px]">
							20 readers enrolled
						</p>
						<p className="font-[500] text-[12px] leading-[1.5]">
							20, May - 27, May 2024
						</p>
					</div>

					<Button
						size="xs"
						variant="ghost"
						className="font-[400] text-[12px] text-[#959595]">
						See More
					</Button>
				</div>
			</div>
		</div>
	);
};

const ReaderActivities = () => {
	const activities = [
		{
			text: "Admin added 2 new modules to Omolara Oriye",
			date: "May 7, 2024",
		},
		{
			text: "Admin added 2 new modules to Omolara Oriye",
			date: "May 7, 2024",
		},
		{
			text: "Admin added 2 new modules to Omolara Oriye",
			date: "May 7, 2024",
		},
	];

	return (
		<div className="bg-white p-[20px] rounded-[16px]">
			<div className="flex items-center justify-between">
				<h3 className="font-[600] text-[14px] leading-[1.57] text-[#38385B]">
					Human Book Activities
				</h3>

				<Button
					size="xs"
					variant="ghost"
					className="font-[400] text-[12px] text-[#959595]">
					See More
				</Button>
			</div>

			<div className="flex flex-col gap-[12px] mt-[24px]">
				{activities.map((activity, index) => (
					<div key={index} className="flex justify-between gap-[24px]">
						<p className="font-[400] text-[12px] text-[#38385B]">
							{activity.text}
						</p>
						<p className="font-[400] text-[12px] text-[#38385B] whitespace-nowrap">
							{activity.date}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

const Activities = () => {
	const [seeMore, setSeeMore] = useState(false);
	const activities = [
		{
			text: "Admin added 2 new modules to Omolara Oriye",
			date: "May 7, 2024",
		},
		{
			text: "Admin added 2 new modules to Omolara Oriye",
			date: "May 7, 2024",
		},
		{
			text: "Admin added 2 new modules to Omolara Oriye",
			date: "May 7, 2024",
		},
		{
			text: "Admin added 2 new modules to Omolara Oriye",
			date: "May 7, 2024",
		},
		{
			text: "Admin added 2 new modules to Omolara Oriye",
			date: "May 7, 2024",
		},
		{
			text: "Admin added 2 new modules to Omolara Oriye",
			date: "May 7, 2024",
		},
		{
			text: "Admin added 2 new modules to Omolara Oriye",
			date: "May 7, 2024",
		},
		{
			text: "Admin added 2 new modules to Omolara Oriye",
			date: "May 7, 2024",
		},
		{
			text: "Admin added 2 new modules to Omolara Oriye",
			date: "May 7, 2024",
		},
		{
			text: "Admin added 2 new modules to Omolara Oriye",
			date: "May 7, 2024",
		},
	];

	return (
		<div className="bg-white p-[20px] rounded-[16px]">
			<div className="flex items-center justify-between">
				<h3 className="font-[600] text-[14px] leading-[1.57] text-[#38385B]">
					Activities
				</h3>
			</div>

			<div
				className={`transition-all duration-500 overflow-auto ${
					seeMore ? "h-auto " : "h-[350px]"
				}`}>
				<div className="flex flex-col gap-[12px] mt-[24px]">
					{activities.map((activity, index) => (
						<div key={index} className="flex justify-between gap-[12px]">
							<p className="font-[400] text-[12px] text-[#38385B]">
								{activity.text}
							</p>
							<p className="font-[400] text-[12px] text-[#38385B] whitespace-nowrap">
								{activity.date}
							</p>
						</div>
					))}
				</div>
			</div>

			<div className="flex justify-center mt-[12px]">
				<Button
					size="xs"
					variant="ghost"
					className="font-[400] text-[12px] text-[#959595]"
					onClick={() => setSeeMore(!seeMore)}>
					See {!seeMore ? "More" : "Less"}
				</Button>
			</div>
		</div>
	);
};

const Events = () => {
	const events = [
		{
			title: "Feminism Watch",
			date: "Oct 7, 2024",
		},
		{
			title: "Feminism Watch",
			date: "Oct 7, 2024",
		},
	];
	return (
		<div className="bg-[#38385B] p-[20px] rounded-[16px]">
			<h3 className="font-[600] text-[14px] leading-[1.57] text-white text-center">
				Events
			</h3>

			<div className="flex flex-col gap-[12px] mt-[24px]">
				{events.map((event, index) => (
					<div key={index} className="flex justify-between gap-[12px]">
						<p className="font-[400] text-[12px] text-white">{event.title}</p>
						<p className="font-[300] text-[12px] text-white whitespace-nowrap">
							{event.date}
						</p>
					</div>
				))}
			</div>

			<Button size="sm" className="block w-full mt-[48px] bg-[#00000047]">
				Add events
			</Button>
		</div>
	);
};
