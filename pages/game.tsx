import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Link from 'next/link';
import Identity from '../components/Identity';

const Game: NextPage = () => {
	const [text, setText] = useState(['']);
	const [notation, setNotation] = useState('');
	const [index, setIndex] = useState(0);

	return (
		<div className="w-full">
			<div className="flex absolute top-4 left-4">
				<Link href="/" passHref>
					<p className="font-medium text-xl rounded-lg border-2 border-black flex cursor-pointer">
						<div className="pl-2 pr-1">draw</div>
						<div className="bg-black px-2 text-white">.ink</div>
					</p>
				</Link>
			</div>
			<div className="h-screen flex flex-col justify-center items-center gap-8 px-4">
				<Card className="p-5 max-w-2xl w-full flex flex-col items-center">
					<canvas></canvas>
				</Card>
				<Button onClick={() => console.log('pressed')}>Generate</Button>
			</div>
		</div>
	);
};

export default Game;
