import { NextFn, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';

export default function useAuth() {
	const [state, setState] = useState<User | null>(() => auth.currentUser);

	const onChange = (user: User) => {
		setState(user);
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(
			onChange as NextFn<User | null>
		);

		return unsubscribe;
	});

	return state;
}
