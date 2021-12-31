import { createContext, useContext, FC } from 'react';
import io, { Socket } from 'socket.io-client';

const socket = io('https://localhost:3000');
const SocketContext = createContext<Socket>(socket);

const SocketProvider: FC = (props) => (
	<SocketContext.Provider value={socket}>
		{props.children}
	</SocketContext.Provider>
);

export default SocketProvider;
export const useSockets = () => useContext(SocketContext);
