export interface Message {
	type: 'status' | 'message';
	content: string;
	time: number;
	username: string;
}

const message = (username: string, content: string): Message => ({
	type: 'message',
	content: content,
	username,
	time: Date.now()
});

const status = (username: string, content: string): Message => ({
	type: 'status',
	content: content,
	username,
	time: Date.now()
});

export default {
	message,
	status
};
