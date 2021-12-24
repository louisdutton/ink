import React, { useState } from 'react';
import Navigation from './Navigation';
// import Search from './Search'
import { List, Sun, Moon, MagnifyingGlass } from 'phosphor-react';
import IconButton from './IconButton';
import Identity from './Identity';

// TODO: Implement search
export default function Header() {
	const [open, setOpen] = useState(false);

	return (
		<header className="z-50 top-0 left-0 flex justify-between w-screen py-3 px-4 absolute">
			<Identity />
			<Navigation />
		</header>
	);
}
