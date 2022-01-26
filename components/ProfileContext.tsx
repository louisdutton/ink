import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
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
	const [user, loading, error] = useAuthState(auth);
	const [profile, setProfile] = useState<Profile | null>(null);

	useEffect(() => {
		if (!profile && user)
			getDoc(doc(db, "users/" + user.uid)).then((snapshot) =>
				setProfile(snapshot.data() as Profile)
			);
	}, [user]);

	return (
		<ProfileContext.Provider value={profile}>
			{children}
		</ProfileContext.Provider>
	);
};

export const useProfile = () => useContext(ProfileContext);

export default UserProvider;
