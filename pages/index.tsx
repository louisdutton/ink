import Head from 'next/head';
import Link from 'next/link';
import { Meta } from '../components/Meta';
import Button from '../components/Button';
import SignIn from '../components/Auth';
import { Drop, Users, BookOpen } from 'phosphor-react';
import { useContext, useEffect, useState } from 'react';
import List from '../components/List';
import Card from '../components/Card';
import RoomsContainer from '../components/Rooms';

export default function Home() {
	return (
		<div className="w-full bg-neutral-100 dark:bg-transparent">
			<Meta description={'An online drawing game'} />

			<div className="h-screen flex justify-center items-center">
				<div className="p-2 flex flex-col gap-8 max-w-xl w-full">
					<RoomsContainer />
					{/* <Menu /> */}
				</div>
			</div>
		</div>
	);
}

// function Menu() {
// 	const { user } = useAuth();
// 	return user ? <RoomsContainer /> : <SignIn />;
// }
