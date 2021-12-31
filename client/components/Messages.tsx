import { Message } from '../lib/supabase';
import { useEffect, useRef } from 'react';
import List from './List';

type Props = {
	messages: Message[];
};

export default function Messages({ messages }: Props) {
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({
			block: 'start',
			behavior: 'smooth'
		});
	}, [messages]);

	return (
		<div className="overflow-y-scroll px-1 h-[500px] flex flex-col justify-end">
			{messages && (
				<List<Message>
					items={messages as any[]}
					render={(data: Message, i: number | undefined) => (
						<Message data={data} />
					)}
				/>
			)}
			<div ref={bottomRef} />
		</div>
	);
}

type MessageProps = {
	data: Message;
};

function Message({ data }: MessageProps) {
	return (
		<p>
			<span className="font-bold">{data.author + ' '}</span>
			<span className="text-neutral-500">{data.content}</span>
		</p>
	);
}
