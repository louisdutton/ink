import { Profiler, useEffect, useRef } from 'react';
import { useSockets, Message } from './SocketContext';
import EVENTS from '../server/events';
import MessageFeed from './MessageFeed';
import MessageInput from './MessageInput';

export default function Chat() {
	const { socket, messages, roomId, username, setMessages } = useSockets();

	const sendMessage = async (content: string) => {
		if (!String(content).trim() || !messages) return;

		socket.emit(EVENTS.CLIENT.MESSAGE, {
			roomId,
			type: 'message',
			content,
			username
		});

		const localMessage: Message = {
			type: 'message',
			content,
			time: Date.now(),
			username: 'You'
		};

		setMessages([...messages, localMessage]);
	};

	if (!roomId) return <div />;

	return (
		<div className="flex-col justify-end hidden w-64 sm:flex gap-4">
			<MessageFeed messages={messages} />
			<MessageInput action={sendMessage} disabled={false} />
		</div>
	);
}
