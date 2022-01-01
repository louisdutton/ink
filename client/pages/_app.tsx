import '../styles/main.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import SocketProvider from '../components/SocketContext';
import AuthProvider from '../components/AuthContext';

export default function DrawDotInk({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<SocketProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</SocketProvider>
		</AuthProvider>
	);
}
