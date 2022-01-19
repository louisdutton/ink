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
			<div className="flex items-center h-screen">
				<div className="flex flex-col w-screen justify-evenly sm:flex-row">
					{users && (
						<List<User>
							items={users}
							render={(user) => <UserPlate user={user} />}
							className="w-60"
						/>
					)}
					<Canvas />
					<Chat />
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
		<div className="flex items-center justify-between px-5 py-2 border-b gap-4 border-neutral-300">
			{/* <div className="flex items-center justify-center w-10 h-10 rounded-full">
				<UserCircle size={40} />
			</div> */}
			<p className="font-bold whitespace-nowrap truncate ...">
				{user.username}
			</p>
			<p className="text-sm font-bold">{user.score}&nbsp;pts</p>
		</div>
	);
}
