import { User } from 'firebase/auth';
import {
	collection,
	limit,
	query,
	addDoc,
	serverTimestamp,
	orderBy
} from 'firebase/firestore';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { db } from '../lib/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import List from './List';

type MessageData = {
	author: string;
	content: string;
};

type Props = {
	user: User | null | undefined;
};

export default function Messages({ user }: Props) {
	const messagesCollection = collection(db, 'rooms/testing/messages');
	const q = query(messagesCollection, orderBy('createdAt'));
	const [messages] = useCollectionData(q);
	const [formValue, setFormValue] = useState<string>('');

	// message scroll
	const ref = useRef<HTMLDivElement>(null);
	useEffect(
		() => ref.current?.scrollIntoView({ behavior: 'smooth' }),
		[messages]
	);

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
		<div className="w-60 hidden sm:flex flex-col justify-end gap-4 px-4">
			<div className="overflow-y-scroll px-1 h-[500px]">
				{messages && (
					<List<MessageData>
						items={messages as any[]}
						render={(data: MessageData, i: number | undefined) => (
							<Message data={data} />
						)}
					/>
				)}
				<div ref={ref} />
			</div>
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
	);
}

type MessageProps = {
	data: MessageData;
};

function Message({ data }: MessageProps) {
	return (
		<p>
			<span className="font-bold">{data.author + ' '}</span>
			<span className="text-neutral-500">{data.content}</span>
		</p>
	);
}
