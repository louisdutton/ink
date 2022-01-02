import { createClient, User } from '@supabase/supabase-js';
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
	const [users, setUsers] = useState<User[]>([]);
	const [profiles, setProfiles] = useState<Profile[]>([]);
	const [newRoom, handleNewRoom] = useState<Room>();
	const [deletedroom, handleDeletedRoom] = useState<Room>();

	const handleNewMessage = (msg: Message) => {
		setMessages((previous) => Array<Message>().concat(previous, msg));
	};

	// Load initial data and set up listeners
	useEffect(() => {
		// Get rooms
		fetchRooms(setRooms);
		// Listen for new messages
		const messageListener = supabase
			.from<Message>('messages')
			.on('INSERT', (payload) => handleNewMessage(payload.new))
			.subscribe();
		// Listen for new and deleted rooms
		// const roomListener = supabase
		// 	.from('rooms')
		// 	.on('INSERT', (payload) => handleNewRoom(payload.new))
		// 	.on('DELETE', (payload) => handleDeletedRoom(payload.old))
		// 	.subscribe();

		// Cleanup
		return () => {
			messageListener.unsubscribe();
			// roomListener.unsubscribe();
		};
	}, []);

	// Update when the route changes
	useEffect(() => {
		if (props?.roomId > 0) {
			fetchMessages(props.roomId, setMessages);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.roomId]);

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

	return {
		// We can export computed values here to map the authors to each message
		messages,
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

export const fetchModerators = async (setState: Function) => {
	try {
		const { data } = await supabase.from('moderators').select('*');
		if (setState) setState(data);
		return data;
	} catch (error) {
		console.log('error', error);
	}
};

export const fetchMessages = async (roomId: number, setState: Function) => {
	try {
		const { body } = await supabase
			.from('messages')
			.select(`*`)
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
		.select('*')
		.eq('id', user.id)
		.single();

	if (error) console.log(error);
	return data;
}

export default supabase;
