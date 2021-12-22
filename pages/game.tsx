import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { Reverb, FMSynth, Vibrato, start, Unit, Transport } from 'tone';
import { generateSentenceData } from '../lib/text';
import { getRandomScale, getRandomNote } from '../lib/music';
import Button from '../components/Button';
import Card from '../components/Card';
import ABC from '../components/ABC';
import { Note } from '@tonaljs/tonal';
import Link from 'next/link';
import { Listener } from 'tone/build/esm/core/context/Listener';

const notation = `
X:1
%T:Notation + Lyrics Test
%M:4/4
L:1/4
K:C
A B C A 
w:This is a test
`;

const Game: NextPage = () => {
	const [text, setText] = useState(['']);
	const [notation, setNotation] = useState('');
	const [index, setIndex] = useState(0);
	const [synth, setSynth] = useState<FMSynth>();

	useEffect(() => {
		const reverb = new Reverb(0.3).toDestination();
		const vibrato = new Vibrato(8, 0.2).connect(reverb);
		const synth = new FMSynth({
			portamento: 0.075,
			volume: 0.1
		}).connect(vibrato);
		setSynth(synth);
	}, []);

	const handleButtonClick = () => {
		if (!synth) return;
		// must init ToneJs AudioContent on user interaction to enable sound
		start();

		const data = generateSentenceData();

		// generate & play music from sentence
		const scale = getRandomScale();
		const notes = data.words.map(() =>
			getRandomNote(scale)
		) as Unit.Frequency[];

		// reset transport
		Transport.stop();
		Transport.position = 0;

		// queue a note for each word
		// TODO: change to each syllable
		notes.forEach((note, i) => {
			Transport.schedule((time_) => {
				synth.triggerAttackRelease(note, '8n.');
				setIndex(i);
			}, `${(i / 4) << 0}:${i % 4}:0`); // black magic
		});

		Transport.start();
		console.log(data);
		// set text as array so it can be broken into spans for highlighting
		setText(data.words);

		let abc = 'L:1/4\n';
		notes.forEach((freq: Unit.Frequency) => {
			let note = freq as string;
			note = note.slice(0, note.length - 1);
			if (note.length > 1) {
				note = (note[1] === '#' ? '^' : '_') + note[0];
			}
			abc += note;
		});
		abc = abc.replaceAll(/0-9]/g, '').replaceAll('#', '^').replaceAll('b', '_');
		// abc += '\n' + 'w:';
		// abc += data.words.join(' ').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
		console.log(abc);
		setNotation(abc);
	};

	const getColor = (i: number) => (index === i ? 'text-orange-400' : '');

	return (
		<div className="w-full">
			<Link href="/" passHref>
				<h1 className="absolute p-4 font-bold text-orange-400 cursor-pointer">
					Lyrics Against Humanity
				</h1>
			</Link>
			<div className="h-screen flex flex-col justify-center items-center gap-8 px-4">
				<Card className="p-5 max-w-2xl w-full flex flex-col items-center">
					<ABC notation={notation} index={index} />
					<p>
						{text.map((word, i) => (
							<span key={i} className={`transition-colors ${getColor(i)}`}>
								{word + ' '}
							</span>
						))}
					</p>
				</Card>
				<Button onClick={handleButtonClick}>Generate</Button>
			</div>
		</div>
	);
};

export default Game;
