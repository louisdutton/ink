import React, { useState } from 'react';
import Navigation from './Navigation';
import Identity from './Identity';
import { Sun, Moon } from 'phosphor-react';
import { useTheme } from 'next-themes';
import IconButton from './IconButton';

export default function Header() {
	const [open, setOpen] = useState(false);
	const { theme, setTheme } = useTheme();

	return (
		<header className="z-50 top-0 left-0 flex justify-between w-screen py-3 px-4 absolute">
			<Identity />
			<IconButton onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
				{theme === 'dark' ? <Sun /> : <Moon />}
			</IconButton>
			<Navigation />
		</header>
	);
}
