import type { NextPage } from 'next';
import { useState, useEffect, useRef } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Link from 'next/link';
import Identity from '../components/Identity';
import List from '../components/List';
import { User, UserCircle } from 'phosphor-react';
import Input from '../components/Input';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { firebase, auth } from '../lib/firebase';
import { initInk } from '../lib/ink';

type User = {
	name: string;
	img: string | undefined;
	position: number;
};

type Message = {
	author: User;
	content: string;
};

const USERS: User[] = [
	{ name: 'Dr. Tim', img: undefined, position: 0 },
	{ name: 'Hex', img: undefined, position: 1 },
	{ name: 'Louis', img: undefined, position: 2 },
	{ name: 'Fuzzy', img: undefined, position: 3 }
];

const MESSAGES: Message[] = [
	{ author: USERS[0], content: 'hey guys!' },
	{ author: USERS[3], content: 'sup doc' },
	{ author: USERS[2], content: 'hi everyone' },
	{ author: USERS[3], content: 'chicken salad' },
	{ author: USERS[1], content: 'fish cakes' },
	{ author: USERS[2], content: 'dead wasps' },
	{ author: USERS[1], content: 'lonely cats' },
	{ author: USERS[0], content: 'careful spiders' },
	{ author: USERS[2], content: 'terrible toes' },
	{ author: USERS[3], content: 'smelly smeagle' },
	{ author: USERS[2], content: 'lucius malfoy' },
	{ author: USERS[2], content: 'oranges' },
	{ author: USERS[3], content: 'go away' },
	{ author: USERS[0], content: 'come back' },
	{ author: USERS[2], content: 'cheese puffs' },
	{ author: USERS[2], content: 'whoah dude' },
	{ author: USERS[3], content: 'holy cow' },
	{ author: USERS[3], content: 'wowcher' },
	{ author: USERS[2], content: 'yikes' },
	{ author: USERS[2], content: 'watch your step' },
	{ author: USERS[0], content: 'I do not have feet' },
	{ author: USERS[1], content: 'yes you do' },
	{ author: USERS[2], content: 'really?' },
	{ author: USERS[0], content: 'interesting...' }
];

export default function Game() {
	const [text, setText] = useState(['']);
	const [notation, setNotation] = useState('');
	const [index, setIndex] = useState(0);

	return (
		<div className="w-screen h-screen flex py-20 overflow-hidden">
			<List<User>
				items={USERS}
				render={(user: User) => <UserPlate user={user} />}
			/>
			<Card className="flex flex-col items-center flex-1 !border-2 relative">
				<Canvas />
				{/* <p className="absolute font-bold text-2xl top-2 flex gap-1 pointer-events-none">
					<span className="underline">B</span>
					<span className="underline">a</span>
					<span className="underline">n</span>
					<span className="underline">a</span>
					<span className="underline">n</span>
					<span className="underline">a</span>
				</p> */}
			</Card>
			<div className="flex flex-col items-center">
				<div className="p-4 w-full rounded overflow-y-scroll h-full">
					<List<Message>
						items={MESSAGES}
						render={(msg: Message, i: number | undefined) => (
							<MessageItem msg={msg} index={i as number} />
						)}
						className="justify-end flex flex-col h-full"
					/>
				</div>
				{/* <form onSubmit={(e) => MESSAGES.push(e.target.value)}> */}
				<input
					id="message"
					type="text"
					placeholder="Enter message"
					className="px-4 py-2 mx-2 outline-none transition-colors group border-2 rounded
                  placeholder:text-neutral-400
                  hover:border-black
                  focus:border-neutral-800 focus:bg-neutral-100"
				/>
				{/* </form> */}
				{/* <Button onClick={() => console.log('pressed')}>Generate</Button> */}
			</div>
			<div className="top-4 left-4 absolute">
				<Identity />
			</div>
		</div>
	);
}

type UserPlateProps = {
	user: User;
};

function UserPlate({ user }: UserPlateProps) {
	return (
		<div className="flex gap-4 items-center border-b px-5 py-2">
			<p className="w-4 font-bold">{user.position + 1}.</p>
			<div className="rounded-full h-10 w-10 flex items-center justify-center">
				<UserCircle size={40} />
			</div>
			<p className="font-bold">{user.name}</p>
		</div>
	);
}

type MessageItemProps = {
	msg: Message;
	index: number;
};

function MessageItem({ msg, index }: MessageItemProps) {
	console.log(index);

	return (
		<div className="flex gap-2" style={{ opacity: 0.1 * (index + 1) }}>
			{msg.author && <div className="font-bold">{msg.author.name}</div>}
			<div className="text-neutral-500">{msg.content}</div>
		</div>
	);
}

// export async function getServerSideProps() {
// 	const posts = await getDocs(messages);
// 	console.log(posts);

// 	return {
// 		props: {
// 			posts
// 		},
// 		fallback: false
// 	};
// }
function Canvas() {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (ref.current)
			initInk(
				ref.current,
				ref.current.parentElement!.clientWidth,
				ref.current.parentElement!.clientHeight
			);
	});

	return <canvas ref={ref} />;
}
