import { useRef } from 'react';
import Link from 'next/link';
import Button from './Button';
import List from './List';
import { useSockets } from './SocketContext';
import { BookOpen, Users } from 'phosphor-react';
import EVENTS from '../config/events';
import { useRouter } from 'next/router';
import { useAuth } from './AuthContext';

function RoomsContainer() {
	const router = useRouter();
	const { socket, roomId, rooms } = useSockets();
	const newRoomRef = useRef<HTMLInputElement>(null);
	const lobbyFull = false; // dummy
	const { profile } = useAuth();

	function handleCreateRoom() {
		if (!profile) return;
		//get the room name
		const roomName = newRoomRef.current?.value || '';

		if (!roomName.trim()) return;

		// emit room created event
		socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });
	}

	function handleJoinRoom(key: string) {
		if (!profile) return;
		socket.emit(EVENTS.CLIENT.JOIN_ROOM, key, profile.username);
		router.push(key);
	}

	return (
		<nav className="">
			<div className="flex gap-4">
				<input
					ref={newRoomRef}
					placeholder="room name"
					className="border-2 rounded px-4"
				/>
				<Button onClick={handleCreateRoom}>Create Room</Button>
			</div>

			<List<string>
				items={Object.keys(rooms)}
				render={(key: string) => (
					<div key={key}>
						<button
							className="disabled:text-neutral-500 border-2 px-5 py-2 rounded"
							disabled={lobbyFull}
							title={`Join ${rooms[key].name}`}
							onClick={() => handleJoinRoom(key)}>
							{rooms[key].name}
						</button>
					</div>
				)}
				className="grid"
			/>
			<ul className="">
				{Object.keys(rooms).map((key) => {
					return <div key={key}></div>;
				})}
			</ul>
		</nav>
	);
}

// type RoomCardProps = {
// 	room: object;
// };

// const RoomCard = ({ room }: RoomCardProps) => {
// 	return (
// 		<Link href={`/${room.id}`} passHref>
// 			<div>
// 				<Card className="p-5 hover:border-black cursor-pointer bg-white flex flex-col gap-2">
// 					<h3 className="font-bold text-2xl">{}</h3>
// 					<div className="flex gap-8">
// 						<div className="flex items-center gap-2">
// 							<Users size={30} />
// 							<p>0/8</p>
// 						</div>
// 						<div className="flex items-center gap-2">
// 							<BookOpen size={30} />
// 							<p>General</p>
// 						</div>
// 					</div>
// 				</Card>
// 			</div>
// 		</Link>
// 	);
// };

export default RoomsContainer;
