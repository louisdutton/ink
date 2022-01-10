import { useRouter } from 'next/router';
import { createContext, useContext, FC, useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import EVENTS from '@/server/events';
import { Room, User } from '@/server/rooms';

export interface Message {
	type: 'status' | 'message';
	content: string;
	time: number;
	username: string;
}

export interface RoomsRecords {
	[key: string]: Room;
}

export interface Context {
	socket: Socket;
	users: User[];
	username?: string;
	messages?: Message[];
	roomId?: string;
	rooms: RoomsRecords;
	setMessages: (value: Message[]) => void;
	setUsername: (value: string) => void;
	joinRoom: (id: string) => void;
}

export interface SocketCallback {
	data: any;
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
	users: [],
	setUsername: (value: string) => false,
	setMessages: () => false,
	joinRoom: (id: string) => false,
	rooms: {},
	messages: []
});

const SocketProvider: FC = (props) => {
	const router = useRouter();
	const [username, setUsername] = useState<string>();
	const [users, setUsers] = useState<User[]>([]);
	const [roomId, setRoomId] = useState<string>('');
	const [rooms, setRooms] = useState<RoomsRecords>({});
	const [messages, setMessages] = useState<Message[]>([]);

	const joinRoom = (id: string) => {
		socket.emit(
			EVENTS.CLIENT.ROOM_JOIN,
			{ id, username },
			({ error, data }: SocketCallback) => {
				if (error) {
					console.log(error);
				} else {
					setRoomId(id);
					setUsers(data.users);
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
		socket.on(EVENTS.SERVER.ROOM_JOIN, (user) => {
			console.log(user);
			setUsers((users) => [...users, user]);
		});
		socket.on(EVENTS.SERVER.ROOM_LEAVE, (user) => {
			setUsers((users) => users.filter((u) => u !== user));
		});
		socket.on(EVENTS.SERVER.MESSAGE, (message: Message) => {
			setMessages((messages) => [...messages, message]);
		});

		return () => {
			socket.off(EVENTS.SERVER.ROOMS);
			socket.off(EVENTS.SERVER.ROOM_JOIN);
			socket.off(EVENTS.SERVER.ROOM_LEAVE);
			socket.off(EVENTS.SERVER.MESSAGE);
		};
	}, [router]);

	return (
		<SocketContext.Provider
			value={{
				socket,
				users,
				username,
				rooms,
				roomId,
				messages,
				joinRoom,
				setUsername,
				setMessages
			}}>
			{props.children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
export const useSockets = () => useContext(SocketContext);
