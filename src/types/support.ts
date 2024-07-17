export type TicketType = {
	id?: string;
	ticket_id: string;
	subject: string;
	reader: string;
	status: TicketStatusType;
	date: string;
};

export type TicketStatusType = "open" | "closed";
