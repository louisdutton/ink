import { User } from "firebase/auth";
import { doc } from "firebase/firestore";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { auth, db } from "../lib/firebase";

export interface Profile {
	username: string;
	coins: number;
	badges: number[];
	xp: number;
	created: any;
}

interface UserData {
	user?: User;
	profile?: Profile;
}

const ProfileContext = createContext<Profile | null>(null);

interface Props {
	children: ReactNode;
}

const UserProvider = ({ children }: Props): JSX.Element => {
	const [user] = useAuthState(auth);
	if (!user) return <div>{children}</div>;

	const [value, loading, error] = useDocument(doc(db, "users", user.uid));

	return (
		<ProfileContext.Provider value={value?.data() as Profile}>
			{children}
		</ProfileContext.Provider>
	);
};

export const useProfile = () => useContext(ProfileContext);

export default UserProvider;
