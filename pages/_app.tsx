import "../styles/main.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { ThemeProvider } from "next-themes";
import { RouteGuard } from "../components/RouteGuard";

export default function DrawDotInk({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider attribute="class" defaultTheme="light">
			<RouteGuard>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</RouteGuard>
		</ThemeProvider>
	);
}
