import List from '../components/List';
import { UserCircle } from 'phosphor-react';
import Canvas from '../components/Canvas';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../lib/firebase';
import Messages from '../components/Messages';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {
	collection,
	deleteDoc,
	doc,
	setDoc,
	WithFieldValue
} from 'firebase/firestore';

type User = {
	name: string;
	img: string | undefined;
	position: number;
};

export default function Game() {
	const [user] = useAuthState(auth);
	// const usersCollection = collection(db, 'rooms/testing/users');
	// const [users] = useCollectionData(usersCollection);
	const users = null;

	// const joinLobby = async () => {
	// 	if (!user) return;
	// 	await setDoc(doc(usersCollection, 'uid'), user.uid);
	// };

	// const leaveLobby = async () => {
	// 	if (!user) return;
	// 	await deleteDoc(doc(usersCollection, 'uid'));
	// };

	return (
		<div className="h-screen flex items-center">
			<div className="w-screen flex justify-evenly flex-col sm:flex-row">
				{users && (
					<List<any>
						items={users as any[]}
						render={(user: User) => <UserPlate user={user} />}
					/>
				)}
				<Canvas />
				<Messages user={user} />
			</div>
		</div>
	);
}

type UserPlateProps = {
	user: User;
};

function UserPlate({ user }: UserPlateProps) {
	return (
		<div className="flex gap-4 items-center border-b px-5 py-2">
			<p className="w-4 font-bold">{user.position + 1}.</p>
			<div className="rounded-full h-10 w-10 flex items-center justify-center">
				<UserCircle size={40} />
			</div>
			<p className="font-bold whitespace-nowrap">{user.name}</p>
		</div>
	);
}
