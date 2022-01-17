import React, { useState } from 'react';
import Navigation from './Navigation';
import Identity from './Identity';

export default function Header() {
	return (
		<header className="z-50 top-0 left-0 flex justify-between w-screen py-3 px-4 absolute">
			<Identity />
			<Navigation />
		</header>
	);
}
