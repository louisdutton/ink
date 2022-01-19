import React, { useState } from 'react';
import Navigation from './Navigation';
import Identity from './Identity';
import { useSockets } from './SocketContext';

export default function Header() {
	const { username } = useSockets();

	if (!username) return <div />;
	return (
		<header className="z-50 top-0 left-0 flex justify-between w-screen py-3 px-4 absolute">
			<Identity />
			<Navigation />
		</header>
	);
}
