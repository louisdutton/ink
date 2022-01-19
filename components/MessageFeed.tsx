import { useEffect, useRef } from 'react';
import List from './List';
import { Message } from './SocketContext';

interface Props {
	messages?: Message[];
}

const MessageFeed = ({ messages }: Props) => {
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({
			block: 'start',
			behavior: 'smooth'
		});
	}, [messages]);

	if (!messages) return <div />;

	return (
		<div className="overflow-y-scroll break-all px-1 h-[500px] flex flex-col justify-end">
			<List<Message>
				items={messages as any[]}
				render={(data: Message) => {
					switch (data.type) {
						case 'message':
							return <UserMessage data={data} />;
						case 'status':
							return <StatusMessage data={data} />;
					}
				}}
				// className="w-full"
			/>
			<div ref={bottomRef} />
		</div>
	);
};

interface MessageProps {
	data: Message;
}

function UserMessage({ data }: MessageProps) {
	return (
		<p className="msg-in">
			<span className="font-bold">{data.username + ' '}</span>
			<span className="text-neutral-500">{data.content}</span>
		</p>
	);
}

function StatusMessage({ data }: MessageProps) {
	return (
		<p className="px-2 py-1 my-1 text-sm border-l-4 rounded-sm text-neutral-500 dark:border-neutral-600 bg-neutral-800 msg-in">
			{data.username + ' ' + data.content}
		</p>
	);
}

export default MessageFeed;
