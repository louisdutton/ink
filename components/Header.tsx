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
		<header className="z-50 sticky top-0 flex justify-center w-screen h-14 bg-white text-white shadow-sm">
			<div className="flex items-center px-6 w-full gap-6">
				<Identity />
				<Navigation />
			</div>
		</header>
	);
}
