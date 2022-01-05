import { useEffect, useRef } from 'react';
import Button from './Button';
import List from './List';
import { Room, useSockets } from './SocketContext';
import { BookOpen, Users } from 'phosphor-react';
import EVENTS from '../server/events';
import { useRouter } from 'next/router';
import Card from './Card';

function RoomsContainer() {
	const router = useRouter();
	const { socket, rooms, joinRoom } = useSockets();
	const newRoomRef = useRef<HTMLInputElement>(null);

	const createRoom = () => {
		// validate room name
		const name = newRoomRef.current?.value || '';
		if (!name.trim()) return;

		// emit room created event
		const room: Room = {
			name,
			users: [],
			capacity: 8,
			theme: 'General'
		};

		socket.emit(EVENTS.CLIENT.ROOM_CREATE, room, ({ data }: any) => {
			console.log(`Successfully created room: ${data}`);
			joinRoom(data);
		});
	};

	// useEffect(() => {
	// 	console.log(roomId);
	// 	if (roomId) router.push(roomId);
	// }, [roomId]);

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
					<Button onClick={createRoom}>Create Room</Button>
				</div>
				<List<string>
					items={Object.keys(rooms)}
					render={(key: string) => (
						<div key={key} onClick={() => joinRoom(key)}>
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
