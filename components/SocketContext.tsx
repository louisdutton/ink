import { useRouter } from 'next/router';
import { createContext, useContext, FC, useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import EVENTS from '../server/events';

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
	username: string;
	setUsername: Function;
	messages?: Message[];
	setMessages: Function;
	roomId?: string;
	rooms: RoomsRecords;
	joinRoom: (id: string) => void;
}

export interface SocketCallback {
	data: string;
	error?: string;
}

const url =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3000'
		: 'https://draw.ink';

// const url = 'https://draw-dot-ink.herokuapp.com';
const socket = io(url, {
	transports: ['websocket'],
	upgrade: false,
	autoConnect: false
});
const SocketContext = createContext<Context>({
	socket,
	username: 'user',
	setUsername: () => false,
	setMessages: () => false,
	joinRoom: (id) => {},
	rooms: {},
	messages: []
});

const SocketProvider: FC = (props) => {
	const router = useRouter();
	const [username, setUsername] = useState<string>('user');
	const [roomId, setRoomId] = useState<string>('');
	const [rooms, setRooms] = useState<RoomsRecords>({});
	const [messages, setMessages] = useState<Message[]>([]);

	const joinRoom = (id: string) => {
		socket.emit(
			EVENTS.CLIENT.ROOM_JOIN,
			{ id, username },
			({ error }: SocketCallback) => {
				if (error) {
					console.log(error);
				} else {
					setRoomId(id);
					setMessages([]);
					router.push('/' + id);
				}
			}
		);
	};

	useEffect(() => {
		socket.connect();

		socket.on('disconnect', () => {
			socket.removeAllListeners();
			router.push('/');
			console.log('disconnected');
		});
		socket.on(EVENTS.SERVER.ROOMS, (value) => setRooms(value));
		// socket.on(EVENTS.SERVER.ROOM_JOIN, (value) => {
		// 	setRoomId(value);
		// 	setMessages([]);
		// });
		socket.on(EVENTS.SERVER.MESSAGE, (message: Message) => {
			setMessages((messages) => [...messages, message]);
		});

		return () => {
			socket.off(EVENTS.SERVER.ROOMS);
			socket.off(EVENTS.SERVER.ROOM_JOIN);
			socket.off(EVENTS.SERVER.MESSAGE);
		};
	}, [router]);

	return (
		<SocketContext.Provider
			value={{
				socket,
				username,
				setUsername,
				joinRoom,
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
