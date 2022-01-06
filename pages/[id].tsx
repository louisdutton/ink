import { useRouter } from 'next/router';
import { useContext, useEffect, useRef } from 'react';
import Canvas from '../components/Canvas';
import Chat from '../components/Chat';
import { useSockets } from '../components/SocketContext';
import { Meta } from '../components/Meta';

export default function RoomPage() {
	const router = useRouter();
	const { socket, username, roomId } = useSockets();

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
		<div className="bg-neutral-100">
			<Meta description="playing with friends" />
			<div className="h-screen flex items-center">
				<div className="w-screen flex justify-evenly flex-col sm:flex-row">
					{/* {users && (
            <List<User>
              items={users}
              render={(user: User) => <UserPlate user={user} />}
            />
          )} */}
					<Canvas />
					<Chat />
				</div>
			</div>
		</div>
	);
}

// type UserPlateProps = {
// 	user: User;
// };

// function UserPlate({ user }: UserPlateProps) {
// 	return (
// 		<div className="flex gap-4 items-center border-b px-5 py-2">
// 			{/* <p className="w-4 font-bold">{user. + 1}.</p> */}
// 			{/* <div className="rounded-full h-10 w-10 flex items-center justify-center">
// 				<UserCircle size={40} />
// 			</div> */}
// 			<p className="font-bold whitespace-nowrap">{user.id}</p>
// 			<p>0 pts</p>
// 		</div>
// 	);
// }
