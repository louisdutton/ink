import { Profiler, useEffect, useRef } from "react";
import { Message } from "../lib/firebase";
import MessageFeed from "./MessageFeed";
import MessageInput from "./MessageInput";

export default function Chat() {
	// const sendMessage = async (content: string) => {
	// 	if (!String(content).trim() || !messages) return;

	// 	socket.emit(EVENTS.CLIENT.MESSAGE, {
	// 		roomId,
	// 		type: "message",
	// 		content,
	// 		username,
	// 	});

	// 	const localMessage: Message = {
	// 		type: "message",
	// 		content,
	// 		time: Date.now(),
	// 		username: "You",
	// 	};

	// 	setMessages([...messages, localMessage]);
	// };

	return <div />;

	// return (
	// 	<div className="flex-col justify-end hidden w-64 gap-4 sm:flex">
	// 		<MessageFeed messages={messages} />
	// 		<MessageInput action={sendMessage} disabled={false} />
	// 	</div>
	// );
}
