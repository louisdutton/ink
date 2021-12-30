import { createClient, Provider, Session, User } from '@supabase/supabase-js';
import { type } from 'os';
import { useEffect, useState, createContext, useContext } from 'react';

const key =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDc5NTI5NiwiZXhwIjoxOTU2MzcxMjk2fQ.xj2oXnE9p4dTkULUI2Hd5mmuKmbrACWdMldmGc2MrC8';
const url = 'https://lebfmnwnngxllnhzvxpu.supabase.co';

const supabase = createClient(url, key);

export type Message = {
	id: number;
	created_at: string;
	user_id: string;
	room_id: number;
	content: string;
	author: string;
};

export type Profile = {
	id: string;
	created_at: string;
	username: string;
	avatar_url?: string;
	trophies: number;
};

export type Room = {
	id: number;
	created_at: string;
	slug: string;
	name: string;
};

type Props = {
	roomId: number;
};

export const useStore = (props: Props) => {
	const [rooms, setRooms] = useState<Room[]>([]);
	const [messages, setMessages] = useState<Message[]>([]);
	const [users] = useState(new Map());
	const [newMessage, handleNewMessage] = useState<Message>();
	const [newRoom, handleNewRoom] = useState<Room>();
	const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState<User>();
	const [deletedroom, handleDeletedRoom] = useState<Room>();
	const [deletedMessage, handleDeletedMessage] = useState<Message>();

	// Load initial data and set up listeners
	useEffect(() => {
		// Get rooms
		fetchRooms(setRooms);
		// Listen for new and deleted messages
		const messageListener = supabase
			.from('messages')
			.on('INSERT', (payload) => handleNewMessage(payload.new))
			.subscribe();
		// Listen for changes to our users
		const userListener = supabase
			.from('profiles')
			.on('*', (payload) => handleNewOrUpdatedUser(payload.new))
			.subscribe();
		// Listen for new and deleted rooms
		const roomListener = supabase
			.from('rooms')
			.on('INSERT', (payload) => handleNewRoom(payload.new))
			.on('DELETE', (payload) => handleDeletedRoom(payload.old))
			.subscribe();
		// Cleanup on unmount
		return () => {
			messageListener.unsubscribe();
			userListener.unsubscribe();
			roomListener.unsubscribe();
		};
	}, []);

	// Update when the route changes
	useEffect(() => {
		if (props?.roomId > 0) {
			fetchMessages(props.roomId, (messages: Message[]) => {
				messages.forEach((x) => users.set(x.user_id, x.author));
				setMessages(messages);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.roomId]);

	// New message received from Postgres
	useEffect(() => {
		if (newMessage && newMessage.room_id === Number(props.roomId)) {
			const handleAsync = async () => {
				let authorId = newMessage.user_id;
				if (!users.get(authorId))
					await fetchUser(authorId, (user: User) =>
						handleNewOrUpdatedUser(user)
					);
				setMessages(messages.concat(newMessage));
			};
			handleAsync();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newMessage]);

	// Deleted message received from postgres
	useEffect(() => {
		if (deletedMessage)
			setMessages(
				messages.filter((message) => message.id !== deletedMessage.id)
			);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [deletedMessage]);

	// New room received from Postgres
	useEffect(() => {
		if (newRoom) setRooms(rooms.concat(newRoom));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newRoom]);

	// Deleted room received from postgres
	useEffect(() => {
		if (deletedroom)
			setRooms(rooms.filter((room) => room.id !== deletedroom.id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [deletedroom]);

	// New or updated user received from Postgres
	useEffect(() => {
		if (newOrUpdatedUser) users.set(newOrUpdatedUser.id, newOrUpdatedUser);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newOrUpdatedUser]);

	return {
		// We can export computed values here to map the authors to each message
		messages: messages.map((x) => ({ ...x, author: users.get(x.user_id) })),
		rooms:
			rooms !== null ? rooms.sort((a, b) => a.slug.localeCompare(b.slug)) : [],
		users
	};
};

export const fetchRooms = async (setState: Function) => {
	const { body, error } = await supabase.from<Room>('rooms').select('*');
	if (error) alert(error);
	if (setState) setState(body);
	return body;
};

export const fetchUser = async (userId: string, setState: Function) => {
	try {
		let { body } = await supabase
			.from<Profile>('profiles')
			.select(`*`)
			.eq('id', userId);

		if (!body) return null;

		let user = body[0];
		if (setState) setState(user);
		return user;
	} catch (error) {
		console.log('error', error);
	}
};

export const fetchUserRoles = async (setState: Function) => {
	try {
		let { body } = await supabase.from('user_roles').select(`*`);
		if (setState) setState(body);
		return body;
	} catch (error) {
		console.log('error', error);
	}
};

export const fetchMessages = async (roomId: number, setState: Function) => {
	try {
		let { body } = await supabase
			.from('messages')
			.select(`*, author:user_id(*)`)
			.eq('room_id', roomId)
			.order('created_at', { ascending: true });

		if (setState) setState(body);
		return body;
	} catch (error) {
		console.log('error', error);
	}
};

export const addRoom = async (slug: string, user_id: number) => {
	try {
		let { body } = await supabase
			.from('rooms')
			.insert([{ slug, created_by: user_id }]);
		return body;
	} catch (error) {
		console.log('error', error);
	}
};

export const addMessage = async (
	message: string,
	room_id: number,
	user_id: number
) => {
	try {
		let { body } = await supabase
			.from('messages')
			.insert([{ message, room_id, user_id }]);
		return body;
	} catch (error) {
		console.log('error', error);
	}
};

export const deleteRoom = async (room_id: number) => {
	try {
		let { body } = await supabase.from('room').delete().match({ id: room_id });
		return body;
	} catch (error) {
		console.log('error', error);
	}
};

export const deleteMessage = async (message_id: number) => {
	try {
		let { body } = await supabase
			.from('messages')
			.delete()
			.match({ id: message_id });
		return body;
	} catch (error) {
		console.log('error', error);
	}
};

export async function fetchProfile(user: User) {
	const { data, error } = await supabase
		.from<Profile>('profiles')
		.select('id, username')
		.eq('id', user.id)
		.single();

	if (error) console.log(error);
	return data;
}

// Users || Auth

export const UserContext = createContext<User | null>(null);

export default supabase;
