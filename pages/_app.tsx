import '../styles/main.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import supabase, { UserContext } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export default function DrawDotInk({ Component, pageProps }: AppProps) {
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Session | null>();

	useEffect(() => {
		const session = supabase.auth.session();
		if (session?.user) setUser(session?.user);

		const { data: authListener } = supabase.auth.onAuthStateChange(
			async (e, session) => {
				if (session?.user) {
					setSession(session);
					setUser(session.user);
				}
			}
		);

		return () => {
			authListener?.unsubscribe();
		};
	}, [user]);

	return (
		<UserContext.Provider value={user}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</UserContext.Provider>
	);
}
