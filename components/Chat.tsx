import { Profiler, useEffect, useRef } from 'react';
import { useSockets, Message } from './SocketContext';
import EVENTS from '../config/events';
import MessageFeed from './MessageFeed';
import MessageInput from './MessageInput';
import { useAuth } from './AuthContext';

export default function Chat() {
	const { socket, messages, roomId, setMessages } = useSockets();
	const { profile } = useAuth();

	const sendMessage = async (content: string) => {
		if (!String(content).trim() || !messages || !profile) return;

		socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, {
			roomId,
			type: 'message',
			content,
			username: profile?.username
		});

		const message: Message = {
			type: 'message',
			username: 'You',
			content,
			time: Date.now()
		};

		setMessages([...messages, message]);
	};

	if (!roomId) return <div />;

	return (
		<div className="w-60 hidden sm:flex flex-col justify-end gap-4 px-4">
			<MessageFeed messages={messages} />
			<MessageInput action={sendMessage} disabled={!profile} />
		</div>
	);
}
