export interface Message {
	type: 'status' | 'message';
	content: string;
	time: number;
	username: string;
}

export interface Room {
	name: string;
	users: string[];
	capacity: number;
	theme: string;
}

enum Tool {
	Pen,
	Eraser
}
