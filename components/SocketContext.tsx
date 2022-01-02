import { createContext, useContext, FC, useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import EVENTS from '../config/events';

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

export interface RoomsRecords {
	[key: string]: Room;
}

export interface Context {
	socket: Socket;
	username?: string;
	setUsername: Function;
	messages?: Message[];
	setMessages: Function;
	roomId?: string;
	rooms: RoomsRecords;
}

const url =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:4000'
		: 'https://draw-dot-ink.herokuapp.com';

// const url = 'https://draw-dot-ink.herokuapp.com';
const socket = io(url);
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
	const [rooms, setRooms] = useState<RoomsRecords>({});
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

	socket.on('disconnect', () => console.log('disconnected'));

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
