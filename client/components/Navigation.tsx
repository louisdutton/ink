import { UserCircle, Bell } from 'phosphor-react';
import Image from 'next/image';
import supabase, { fetchProfile, Profile, UserContext } from '../lib/supabase';
import { useContext, useEffect, useState } from 'react';

export default function Navigation() {
	const [profile, setProfile] = useState<Profile>();
	const user = useContext(UserContext);

	useEffect(() => {
		if (!user) return;
		fetchProfile(user).then((data) => {
			if (data) setProfile(data);
		});
	}, [user]);

	return profile ? (
		<nav className={`h-full flex relative items-center gap-3`}>
			<p className="font-bold">{profile.username}</p>
			<Bell size={30} weight="duotone" />
			<UserCircle
				size={30}
				weight="duotone"
				onClick={() => supabase.auth.signOut()}
			/>
		</nav>
	) : (
		<div />
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
