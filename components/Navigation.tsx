import { UserCircle, Bell } from 'phosphor-react';
import { User } from 'firebase/auth';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

type Props = {
	mobile?: boolean;
};

export default function Navigation({ mobile = false, ...props }: Props) {
	const [user] = useAuthState(auth);

	return (
		<nav {...props} className={`h-full flex relative items-center gap-3`}>
			{user && <p className="font-bold">{user.displayName}</p>}
			<Bell size={24} weight="duotone" />
			<UserIcon user={user} />
		</nav>
	);
}

type UserIconProps = {
	user: User | null | undefined;
};

function UserIcon({ user }: UserIconProps) {
	return user?.photoURL ? (
		<div className="w-8 h-8 border-2 border-black rounded-full relative overflow-hidden">
			<Image
				src={user.photoURL}
				alt="User profile picture"
				layout="fill"
				objectFit="cover"
			/>
		</div>
	) : (
		// <UserCircle size={40} weight="fill" />
		<UserCircle size={40} weight="duotone" />
	);
}
