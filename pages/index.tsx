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
		<div className="w-full bg-neutral-100">
			<Meta description={'An online drawing game'} />

			<div className="h-screen flex justify-center items-center">
				<div className="p-2 flex flex-col gap-8 max-w-xl w-full">
					<Menu />
				</div>
			</div>
		</div>
	);
}

function Menu() {
	const { user } = useAuth();
	return user ? <RoomsContainer /> : <SignIn />;
}
