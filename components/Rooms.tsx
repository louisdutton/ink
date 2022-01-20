import { FormEvent, useEffect, useRef, useState } from "react";
import Button from "./Button";
import List from "./List";
import { useRouter } from "next/router";
import Card from "./Card";
import Input from "./Input";
import IconButton from "./IconButton";
import { FaUsers, FaBookOpen, FaSpinner } from "react-icons/fa";
import { query, collection, getDocs, DocumentData } from "firebase/firestore";
import { db, rooms } from "@/lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";

function RoomsContainer() {
	const [createRoomActive, setCreateRoomActive] = useState(false);
	const [rooms, setRooms] = useState();
	const [value, loading, error] = useCollection(collection(db, "rooms"));

	// const handleCreateRoom = (room: Room) => {
	// 	socket.emit(EVENTS.CLIENT.ROOM_CREATE, room, ({ data }: any) => {
	// 		console.log(`Successfully created room: ${data}`);
	// 		joinRoom(data);
	// 	});
	// };

	// if (createRoomActive)
	// 	return (
	// 		<RoomCreation
	// 			createRoom={handleCreateRoom}
	// 			setActive={setCreateRoomActive}
	// 		/>
	// 	);

	return (
		<form className="w-full gap-2 p-4">
			<h1 className="py-4 text-4xl font-bold text-center">
				Join or create a room
			</h1>
			{/* <IconButton
				className="absolute"
				onClick={(e) => {
					e.preventDefault();
					socket.emit("request-rooms");
				}}>
				<ArrowsClockwise size={26} />
			</IconButton> */}
			{loading && <FaSpinner className="animate-spin" />}
			{value && (
				<List<DocumentData>
					items={value.docs}
					render={(doc) => (
						<div key={doc.id} onClick={() => console.log(doc.id)}>
							<RoomCard room={doc} />
						</div>
					)}
					className="grid gap-2 sm:grid-cols-2"
				/>
			)}
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
	room: DocumentData;
}

interface Room {
	name: string;
	users: string[];
	capacity: number;
	theme: string;
}

function RoomCard({ room }: RoomCardProps) {
	const { name, users, capacity, theme }: Room = room.data();

	return (
		<Card className="w-40 h-40 gap-2 p-5 shadow-lg cursor-pointer hover:border-black dark:hover:border-white">
			<h3 className="text-xl font-medium">{name}</h3>
			<div className="gap-8 py-2">
				<div className="flex items-center gap-2">
					<FaUsers size={24} />
					<p>
						{users.length}/{capacity}
					</p>
				</div>
				<div className="flex items-center gap-2">
					<FaBookOpen size={24} />
					<p>{theme}</p>
				</div>
			</div>
		</Card>
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
	// const [theme, setTheme] = useState<Theme>("general");

	const handleCreateRoom = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// validate room name
		let name = roomName.current?.value || "";
		if (!name.trim()) return;

		// emit room created event
		const room = {
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
					{/* <X size={26} /> */}
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
