import { UserCircle, Bell } from 'phosphor-react';
import Image from 'next/image';
import { useSockets } from './SocketContext';

export default function Navigation() {
	const { username } = useSockets();

	return (
		<nav className={`h-full flex relative items-center gap-3 text-neutral-500`}>
			<p className="font-medium">{username}</p>
			<Bell size={28} />
			<UserCircle size={28} />
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
