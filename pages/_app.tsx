import '../styles/main.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import SocketProvider from '../components/SocketContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import EVENTS from '../server/events';
import { useSockets } from '../components/SocketContext';

export default function DrawDotInk({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { socket, setUsername } = useSockets();

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
	}, [router.events, socket]);

	return (
		<SocketProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SocketProvider>
	);
}
