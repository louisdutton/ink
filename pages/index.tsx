import Head from 'next/head';
import Link from 'next/link';
import { Meta } from '../components/Meta';
import Button from '../components/Button';
import SignIn from '../components/Auth';
import { Drop, Users, BookOpen } from 'phosphor-react';
import { fetchRooms, Room, useStore } from '../lib/supabase';
import { useContext, useEffect, useState } from 'react';
import List from '../components/List';
import Card from '../components/Card';
import RoomsContainer from '../components/Rooms';
import { useAuth } from '../components/AuthContext';

export default function Home() {
	return (
		<div className="w-full">
			<Meta description={'An online drawing game'} />

			<div className="h-screen flex justify-center items-center">
				<div className="p-2 flex flex-col gap-8 max-w-xl w-full">
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
	const { user } = useAuth();

	if (user) return <RoomsContainer />;
	return (
		<>
			<div className="flex items-center gap-4 justify-center">
				<Drop size={100} weight="fill" />
				<h1 className="font-bold text-8xl">draw.ink</h1>
			</div>
			<SignIn />
		</>
	);
}
