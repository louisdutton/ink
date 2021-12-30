import Head from 'next/head';
import Link from 'next/link';
import { Meta } from '../components/Meta';
import Button from '../components/Button';
import SignIn from '../components/Auth';
import { Drop, Users, BookOpen } from 'phosphor-react';
import { fetchRooms, Room, UserContext, useStore } from '../lib/supabase';
import { useContext, useEffect, useState } from 'react';
import List from '../components/List';
import Card from '../components/Card';

export default function Home() {
	return (
		<div className="w-full">
			<Head>
				<Meta title="draw.Ink" description={'An online drawing game'} />
			</Head>

			<div className="h-screen flex justify-center items-center">
				<div className="p-10 flex flex-col gap-8 max-w-xl w-full">
					<Menu />

					{/* <div className="w-full flex justify-center">
						<Link href="/game" passHref>
							<Button>Play</Button>
						</Link>
					</div> */}
				</div>
			</div>
		</div>
	);
}

function Menu() {
	const user = useContext(UserContext);

	return user ? (
		<RoomList />
	) : (
		<>
			<div className="flex items-center gap-4 justify-center">
				<Drop size={100} weight="fill" />
				<h1 className="font-bold text-8xl">draw.ink</h1>
			</div>
			<SignIn />
		</>
	);
}

function RoomList() {
	const [rooms, setRooms] = useState<Room[]>([]);

	useEffect(() => {
		const rooms = fetchRooms(setRooms).then((rooms) => console.log(rooms));
	}, []);

	return (
		<div>
			<h2 className="font-bold text-4xl py-8 flex justify-center">
				Choose a room
			</h2>
			<List<Room> items={rooms} render={(room) => <RoomCard room={room} />} />
		</div>
	);
}

type RoomCardProps = {
	room: Room;
};
function RoomCard({ room }: RoomCardProps) {
	return (
		<Link href={`/${room.id}`} passHref>
			<div>
				<Card className="p-5 hover:border-black cursor-pointer bg-white flex flex-col gap-2">
					<h3 className="font-bold text-2xl">{room.name}</h3>
					<div className="flex gap-8">
						<div className="flex items-center gap-2">
							<Users size={30} />
							<p>0/8</p>
						</div>
						<div className="flex items-center gap-2">
							<BookOpen size={30} />
							<p>General</p>
						</div>
					</div>
				</Card>
			</div>
		</Link>
	);
}
