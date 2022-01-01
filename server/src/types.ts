export interface Message {
	type: 'status' | 'message';
	content: string;
	time: number;
	username: string;
}

enum Tool {
	Pen,
	Eraser
}
