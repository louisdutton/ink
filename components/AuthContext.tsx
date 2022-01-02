import { Session, User } from '@supabase/supabase-js';
import { createContext, useContext, FC, useState, useEffect } from 'react';
import supabase, { fetchProfile, Profile } from '../lib/supabase';

interface Auth {
	session?: Session;
	user?: User;
	profile?: Profile;
}

export const AuthContext = createContext<Auth>({
	session: undefined,
	user: undefined
});

const SocketProvider: FC = (props) => {
	const [user, setUser] = useState<User>();
	const [session, setSession] = useState<Session>();
	const [profile, setProfile] = useState<Profile>();

	const fetchAuthData = async (session: Session | null) => {
		const newUser = session?.user;
		if (newUser) {
			setSession(session);
			setUser(newUser);
			const newProfile = await fetchProfile(newUser);
			if (newProfile) setProfile(newProfile);
		}
	};

	useEffect(() => {
		const session = supabase.auth.session();
		fetchAuthData(session);

		const { data: authListener } = supabase.auth.onAuthStateChange(
			async (e, session) => fetchAuthData(session)
		);

		return () => {
			authListener?.unsubscribe();
		};
	}, [user]);

	return (
		<AuthContext.Provider
			value={{
				session,
				user,
				profile
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
export default SocketProvider;
