import React, { useState } from 'react';
import Navigation from './Navigation';
import Identity from './Identity';
import { useSockets } from './SocketContext';

export default function Header() {
	const { username } = useSockets();

	if (!username) return <div />;
	return (
		<header className="absolute top-0 left-0 z-50 flex justify-between w-screen px-4 py-3">
			<Identity />
			<Navigation />
		</header>
	);
}
