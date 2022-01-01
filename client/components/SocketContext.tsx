import { createContext, useContext, FC, useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config/default';
import EVENTS from '../config/events';

export interface Message {
	type: 'status' | 'message';
	content: string;
	time: number;
	username: string;
}
export interface Context {
	socket: Socket;
	username?: string;
	setUsername: Function;
	messages?: Message[];
	setMessages: Function;
	roomId?: string;
	rooms: object;
}

const socket = io(SOCKET_URL);
const SocketContext = createContext<Context>({
	socket,
	setUsername: () => false,
	setMessages: () => false,
	rooms: {},
	messages: []
});

const SocketProvider: FC = (props) => {
	const [username, setUsername] = useState<string>('');
	const [roomId, setRoomId] = useState<string>('');
	const [rooms, setRooms] = useState<object>({});
	const [messages, setMessages] = useState<Message[]>([]);

	socket.on(EVENTS.SERVER.ROOMS, (value) => {
		setRooms(value);
	});

	socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
		setRoomId(value);
		setMessages([]);
	});

	socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
		setRoomId(value);
		setMessages([]);
	});

	useEffect(() => {
		socket.on(EVENTS.SERVER.ROOM_MESSAGE, (message: Message) => {
			setMessages((messages) => [...messages, message]);
		});
	}, [socket]);

	return (
		<SocketContext.Provider
			value={{
				socket,
				username,
				setUsername,
				rooms,
				roomId,
				messages,
				setMessages
			}}>
			{props.children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
export const useSockets = () => useContext(SocketContext);
