import { createContext, useContext } from 'react';
import io, { Socket } from 'socket.io-client';

const socket = io('https://localhost:3000');
const SocketContext = createContext<Socket>(socket);

export default function SocketProvider(props: any) {
	return (
		<SocketContext.Provider value={socket}>{...props}</SocketContext.Provider>
	);
}

export const useSockets = () => useContext(SocketContext);
