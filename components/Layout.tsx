import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { CoreMeta } from './Meta';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import EVENTS from '../server/events';
import { useSockets } from './SocketContext';

type Props = {
	children: any;
};

export default function Layout({ children }: Props) {
	const router = useRouter();
	const { socket } = useSockets();

	useEffect(() => {
		const handleRouteChange = (
			url: string,
			{ shallow }: { shallow: boolean }
		) => {
			if (socket && url === '/' && !shallow)
				socket.emit(EVENTS.CLIENT.ROOM_LEAVE);
			console.log(socket);
		};

		// subscribe
		router.events.on('routeChangeStart', handleRouteChange);

		// unsubscribe
		return () => {
			router.events.off('routeChangeStart', handleRouteChange);
		};
	}, []);

	return (
		<>
			<CoreMeta />
			<Header />
			<main className="flex justify-center">{children}</main>
			<Footer />
		</>
	);
}
