import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Button from './Button';
import List from './List';
import { Room, useSockets } from './SocketContext';
import { BookOpen, Users } from 'phosphor-react';
import EVENTS from '../config/events';
import { useRouter } from 'next/router';
import { useAuth } from './AuthContext';
import Card from './Card';

function RoomsContainer() {
	const router = useRouter();
	const { socket, roomId, rooms } = useSockets();
	const newRoomRef = useRef<HTMLInputElement>(null);
	const { profile } = useAuth();

	function handleCreateRoom() {
		if (!profile) return;

		// validate room name
		const name = newRoomRef.current?.value || '';
		if (!name.trim()) return;

		// emit room created event
		socket.emit(EVENTS.CLIENT.CREATE_ROOM, {
			name,
			capacity: 8,
			theme: 'General'
		} as Room);
	}

	useEffect(() => {
		console.log(roomId);
		if (roomId) router.push(roomId);
	}, [roomId]);

	function handleJoinRoom(key: string) {
		console.log(roomId, key);

		if (!profile) return;
		socket.emit(EVENTS.CLIENT.JOIN_ROOM, key, profile.username);
	}

	return (
		<nav className="">
			<div className="flex gap-2 flex-col">
				<h1 className="font-bold text-4xl text-center py-4">
					Join or create a room
				</h1>
				<div className="flex gap-2 w-full">
					<input
						ref={newRoomRef}
						placeholder="Enter room name"
						className="border-2 rounded px-4 py-2 flex-1 hover:border-black outline-none transition-colors focus:border-black focus:bg-neutral-100"
					/>
					<Button onClick={handleCreateRoom}>Create Room</Button>
				</div>
				<List<string>
					items={Object.keys(rooms)}
					render={(key: string) => (
						<div key={key} onClick={() => handleJoinRoom(key)}>
							<RoomCard room={rooms[key]} />
						</div>
					)}
					className="grid gap-2 sm:grid-cols-2"
				/>
			</div>
		</nav>
	);
}
export default RoomsContainer;

interface RoomCardProps {
	room: Room;
}

function RoomCard({ room }: RoomCardProps) {
	return (
		<div>
			<Card className="p-5 hover:border-black cursor-pointer bg-white flex flex-col gap-2">
				<h3 className="font-bold text-2xl">{room.name}</h3>
				<div className="flex gap-8">
					<div className="flex items-center gap-2">
						<Users size={30} />
						<p>
							{room.users.length}/{room.capacity}
						</p>
					</div>
					<div className="flex items-center gap-2">
						<BookOpen size={30} />
						<p>{room.theme}</p>
					</div>
				</div>
			</Card>
		</div>
	);
}
