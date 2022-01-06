import '../styles/main.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import SocketProvider from '../components/SocketContext';

export default function DrawDotInk({ Component, pageProps }: AppProps) {
	return (
		<SocketProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SocketProvider>
	);
}
