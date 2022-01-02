import { UserCircle, Bell } from 'phosphor-react';
import Image from 'next/image';
import supabase from '../lib/supabase';
import { useAuth } from './AuthContext';

export default function Navigation() {
	const { user, profile } = useAuth();

	if (!profile) return <div />;

	return (
		<nav className={`h-full flex relative items-center gap-3`}>
			<p className="font-bold">{profile.username}</p>
			<Bell size={30} weight="duotone" />
			<UserCircle
				size={30}
				weight="duotone"
				onClick={() => supabase.auth.signOut()}
			/>
		</nav>
	);
}

type AvatarProps = {
	url: string;
};

function Avatar({ url }: AvatarProps) {
	return (
		<div className="w-8 h-8 border-2 border-black rounded-full relative overflow-hidden">
			<Image
				src={url}
				alt="User profile picture"
				layout="fill"
				objectFit="cover"
			/>
		</div>
	);
}
