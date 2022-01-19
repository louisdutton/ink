import { FormEvent, useEffect, useRef, useState } from "react";
import Button from "./Button";
import List from "./List";
import { useSockets } from "./SocketContext";
import { BookOpen, Users, X, ArrowsClockwise } from "phosphor-react";
import EVENTS from "../server/events";
import { useRouter } from "next/router";
import Card from "./Card";
import Input from "./Input";
import IconButton from "./IconButton";
import { Room, Theme } from "@/server/rooms";

function RoomsContainer() {
	const { socket, rooms, joinRoom, setUsername } = useSockets();
	const usernameInput = useRef<HTMLInputElement>(null);
	const [createRoomActive, setCreateRoomActive] = useState(false);

	const handleCreateRoom = (room: Room) => {
		socket.emit(EVENTS.CLIENT.ROOM_CREATE, room, ({ data }: any) => {
			console.log(`Successfully created room: ${data}`);
			joinRoom(data);
		});
	};

	useEffect(() => {
		socket.emit("request-rooms");
	}, [socket]);

	if (createRoomActive)
		return (
			<RoomCreation
				createRoom={handleCreateRoom}
				setActive={setCreateRoomActive}
			/>
		);

	return (
		<form className="flex flex-col gap-2">
			<h1 className="py-4 text-4xl font-bold text-center">
				Join or create a room
			</h1>
			<IconButton
				className="absolute"
				onClick={(e) => {
					e.preventDefault();
					socket.emit("request-rooms");
				}}>
				<ArrowsClockwise size={26} />
			</IconButton>
			<List<string>
				items={Object.keys(rooms)}
				render={(key: string) => (
					<div key={key} onClick={() => joinRoom(key)}>
						<RoomCard room={rooms[key]} />
					</div>
				)}
				className="grid gap-2 sm:grid-cols-2"
			/>
			<Button
				onClick={(e) => {
					e.preventDefault();
					setCreateRoomActive(true);
				}}>
				Create Room
			</Button>
		</form>
	);
}
export default RoomsContainer;

interface RoomCardProps {
	room: Room;
}

function RoomCard({ room }: RoomCardProps) {
	return (
		<div>
			<Card className="flex flex-col gap-2 p-5 cursor-pointer hover:border-black dark:hover:border-white">
				<h3 className="text-2xl font-bold">{room.name}</h3>
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

interface RoomCreationProps {
	createRoom: Function;
	setActive: Function;
}

type Capacity = 4 | 8 | 16;

const RoomCreation = ({ createRoom, setActive }: RoomCreationProps) => {
	const roomName = useRef<HTMLInputElement>(null);
	const [capacity, setCapacity] = useState<Capacity>(8);
	const [theme, setTheme] = useState<Theme>("general");

	const handleCreateRoom = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// validate room name
		let name = roomName.current?.value || "";
		if (!name.trim()) return;

		// emit room created event
		const room: Room = {
			name,
			users: [],
			capacity,
			theme,
		};

		console.log(room);

		createRoom(room);
	};

	return (
		<form
			className="relative flex flex-col w-full gap-2"
			onSubmit={handleCreateRoom}>
			<div className="flex justify-end">
				<button className="" onClick={() => setActive(false)}>
					<X size={26} />
				</button>
			</div>
			<h1 className="py-4 text-5xl font-bold">Create a room</h1>
			<hr />
			<Input ref={roomName} label="room name" />
			<div className="flex w-full gap-2 my-2">
				<select
					onChange={(e) => setCapacity(parseInt(e.target.value) as Capacity)}
					name="Size"
					id="size"
					className="h-10 px-4 border rounded bg-neutral-100 dark:bg-neutral-700">
					<option value={4}>4</option>
					<option value={8}>8</option>
					<option value={16}>16</option>
				</select>
				<select
					onChange={(e) => setTheme(e.target.value as Theme)}
					name="Theme"
					id="theme"
					defaultValue="general"
					className="flex-1 h-10 px-4 font-medium border rounded bg-neutral-100 dark:bg-neutral-700">
					<option value="general">General</option>
					<option value="animals">Animals</option>
					<option value="objects">Objects</option>
				</select>
			</div>
			<hr className="py-3" />
			<Button type="submit">create room</Button>
		</form>
	);
};
