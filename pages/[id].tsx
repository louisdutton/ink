import { useRouter } from 'next/router';
import supabase, {
	useStore,
	addMessage,
	UserContext,
	Message
} from '../lib/supabase';
import { useContext, useEffect, useRef } from 'react';
import Canvas from '../components/Canvas';
import Messages from '../components/Messages';
import MessageInput from '../components/MessageInput';
import { User } from '@supabase/supabase-js';
import List from '../components/List';

export default function RoomPage() {
	const router = useRouter();
	const user = useContext(UserContext);

	// Else load up the page
	const { id } = router.query;
	const roomId = Number(id);
	const { messages } = useStore({ roomId });

	// redirect to public channel when current channel is deleted
	// useEffect(() => {
	// 	if (!rooms.some((room) => room.id === Number(roomId))) {
	// 		router.push('/');
	// 	}
	// }, [rooms, roomId]);

	const sendMessage = async (content: string) => {
		if (!user) return;

		const { error } = await supabase
			.from<Message>('messages')
			.insert([{ user_id: user.id, room_id: roomId, content, author: 'test' }]);

		if (error) alert(error);
	};

	return (
		<div className="h-screen flex items-center">
			<div className="w-screen flex justify-evenly flex-col sm:flex-row">
				{/* {users && (
					<List<User>
						items={users}
						render={(user: User) => <UserPlate user={user} />}
					/>
				)} */}
				<Canvas />
				<div className="w-60 hidden sm:flex flex-col justify-end gap-4 px-4">
					<Messages messages={messages} />
					<MessageInput action={sendMessage} />
				</div>
			</div>
		</div>
	);
}

type UserPlateProps = {
	user: User;
};

function UserPlate({ user }: UserPlateProps) {
	return (
		<div className="flex gap-4 items-center border-b px-5 py-2">
			{/* <p className="w-4 font-bold">{user. + 1}.</p> */}
			{/* <div className="rounded-full h-10 w-10 flex items-center justify-center">
				<UserCircle size={40} />
			</div> */}
			<p className="font-bold whitespace-nowrap">{user.id}</p>
			<p>0 pts</p>
		</div>
	);
}
