import { useState, useEffect, useRef } from 'react';
import List from '../components/List';
import { UserCircle } from 'phosphor-react';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { firebase, auth } from '../lib/firebase';
import Canvas from '../components/Canvas';

type User = {
	name: string;
	img: string | undefined;
	position: number;
};

type Message = {
	author: User;
	content: string;
};

let USERS: User[] = [
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
	{ author: USERS[1], content: 'lonely cats' }
];

export default function Game() {
	const [messages, setMessages] = useState(MESSAGES);

	return (
		<div className="py-20 h-screen flex">
			<div className="w-screen h-full flex justify-between flex-col sm:flex-row">
				<List<User>
					items={USERS}
					render={(user: User) => <UserPlate user={user} />}
				/>
				<Canvas />
				<div className="">
					<List<Message>
						items={messages}
						render={(msg: Message, i: number | undefined) => (
							<MessageItem msg={msg} index={i as number} />
						)}
						className="justify-end flex flex-col p-4"
					/>
					<form
						onSubmit={(e) =>
							setMessages([...messages, { author: USERS[0], content: 'Hello' }])
						}>
						<input
							id="message"
							type="text"
							placeholder="Enter message"
							className="px-4 py-2 mx-2 outline-none transition-colors group border-2 rounded
                        placeholder:text-neutral-400
                        hover:border-black
                        focus:border-neutral-800 focus:bg-neutral-100"
						/>
					</form>
				</div>
				{/* <Button onClick={() => console.log('pressed')}>Generate</Button> */}
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
			<p className="font-bold whitespace-nowrap">{user.name}</p>
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
		<div className="flex gap-2">
			{msg.author && <div className="font-bold">{msg.author.name}</div>}
			<div className="text-neutral-500">{msg.content}</div>
		</div>
	);
}

function Word() {
	return (
		<p className="absolute font-bold text-2xl top-2 flex gap-1 pointer-events-none">
			<span className="underline">B</span>
			<span className="underline">a</span>
			<span className="underline">n</span>
			<span className="underline">a</span>
			<span className="underline">n</span>
			<span className="underline">a</span>
		</p>
	);
}
