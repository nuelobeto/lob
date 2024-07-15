export function getDateInMMDDYY(): string {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const today = new Date();
	const month = months[today.getMonth()];
	const day = today.getDate();
	const year = today.getFullYear();

	return `${month} ${day}, ${year}`;
}

export function formatDateToMMDDYY(date: Date): string {
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "2-digit",
		year: "numeric",
	});
}
