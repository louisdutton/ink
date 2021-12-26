import { useState, useEffect, useRef, FormEvent } from 'react';
import List from '../components/List';
import { UserCircle, ArrowBendLeftDown, Spinner } from 'phosphor-react';
import Canvas from '../components/Canvas';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../lib/firebase';
import {
	collection,
	limit,
	query,
	addDoc,
	doc,
	serverTimestamp,
	orderBy
} from 'firebase/firestore';

type User = {
	name: string;
	img: string | undefined;
	position: number;
};

type Message = {
	author: string;
	content: string;
};

export default function Game() {
	const [user] = useAuthState(auth);
	const messagesCollection = collection(db, 'rooms/testing/messages');
	const q = query(messagesCollection, orderBy('createdAt'), limit(25));
	const [messages] = useCollectionData(q);
	const [formValue, setFormValue] = useState<string>('');

	const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (formValue === '') return;

		const data = {
			author: user?.displayName,
			content: formValue,
			createdAt: serverTimestamp()
		};

		await addDoc(collection(db, 'rooms/testing/messages'), data);

		setFormValue('');
	};

	return (
		<div className="h-screen flex items-center">
			<div className="w-screen flex justify-evenly flex-col sm:flex-row">
				<List<User>
					items={[]}
					render={(user: User) => <UserPlate user={user} />}
				/>
				<Canvas />
				<div className="w-60 hidden sm:flex flex-col justify-end gap-4 px-4">
					<MessageFeed messages={messages} />
					<form onSubmit={sendMessage}>
						<input
							id="message"
							type="text"
							placeholder="Enter message"
							value={formValue}
							autoComplete="off"
							onChange={(e) => setFormValue(e.target.value)}
							className="px-4 py-2 outline-none transition-colors group border-2 rounded
                        placeholder:text-neutral-400
                        hover:border-black
                        focus:border-neutral-800 focus:bg-neutral-100"
						/>
						<button type="submit" />
					</form>
				</div>
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

type MessageFeedProps = {
	messages: any;
};

function MessageFeed({ messages }: MessageFeedProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		ref.current?.scrollTo(0, document.body.scrollHeight);
	}, [messages]);
	return messages ? (
		<div className="overflow-y-scroll px-1 h-[500px]" ref={ref}>
			<List<Message>
				items={messages as any[]}
				render={(msg: Message, i: number | undefined) => (
					<MessageItem msg={msg} index={i as number} />
				)}
			/>
		</div>
	) : (
		<div />
	);
}

type MessageItemProps = {
	msg: Message;
	index: number;
};

function MessageItem({ msg, index }: MessageItemProps) {
	return (
		<p>
			<span className="font-bold">{msg.author + ' '}</span>
			<span className="text-neutral-500">{msg.content}</span>
		</p>
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
