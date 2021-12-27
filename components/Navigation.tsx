import { UserCircle, UserFocus } from 'phosphor-react';
import { User } from 'firebase/auth';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';

type Props = {
	mobile?: boolean;
};

export default function Navigation({ mobile = false, ...props }: Props) {
	const [user] = useAuthState(auth);

	return (
		<nav {...props} className={`h-full flex relative items-center gap-3`}>
			{user && <p className="font-bold">{user.displayName}</p>}
			<UserIcon user={user} />
		</nav>
	);
}

type UserIconProps = {
	user: User | null | undefined;
};

function UserIcon({ user }: UserIconProps) {
	return user?.photoURL ? (
		// <Image
		// 	src={''}
		// 	alt="User profile picture"
		// 	width={40}
		// 	height={40}
		// 	className="rounded-full border-2 border-black"
		// />
		<UserCircle size={40} weight="fill" />
	) : (
		<UserCircle size={40} weight="fill" />
	);
}
