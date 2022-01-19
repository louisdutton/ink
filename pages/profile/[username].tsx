import { useRouter } from 'next/router';
import { useContext, useEffect, useRef } from 'react';
import Canvas from '@/components/Canvas';
import Chat from '@/components/Chat';
import { useSockets } from '@/components/SocketContext';
import { Meta } from '@/components/Meta';
import List from '@/components/List';
import { User } from '@/server/rooms';

export default function RoomPage() {
	const router = useRouter();
	const { socket, username, roomId, users } = useSockets();

	// Else load up the page
	const { id } = router.query;
	// useEffect(() => {
	// 	if (!profile) {
	// 		router.push('/');
	// 		return;
	// 	}
	// 	if (roomId !== id)
	// 		socket.emit(EVENTS.CLIENT.JOIN_ROOM, roomId, profile.username);
	// }, [roomId]);

	return (
		<div className="dark:bg-transparent">
			<Meta description="playing with friends" />
			<div className="h-screen flex items-center">
				<div className="w-screen flex justify-evenly flex-col sm:flex-row">

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
		<div className="flex justify-between gap-4 items-center border-b border-neutral-300 px-5 py-2">
			{/* <div className="rounded-full h-10 w-10 flex items-center justify-center">
				<UserCircle size={40} />
			</div> */}
			<p className="font-bold whitespace-nowrap truncate ...">
				{user.username}
			</p>
			<p className="text-sm font-bold">{user.score}&nbsp;pts</p>
		</div>
	);
}
