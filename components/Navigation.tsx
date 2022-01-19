import { FaBell, FaUserCircle } from 'react-icons/fa';
import Image from 'next/image';
import { useSockets } from './SocketContext';
import IconButton from './IconButton';
import { CgDarkMode } from 'react-icons/cg';
import { useTheme } from 'next-themes';
import { useState } from 'react';

export default function Navigation() {
	const { username } = useSockets();
	const [open, setOpen] = useState(false);
	const { theme, setTheme } = useTheme();

	return (
		<nav className={`h-full flex relative items-center gap-4`}>
			<IconButton onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
				<CgDarkMode size={26} />
			</IconButton>
			<p className="font-semibold text-neutral-600">{username}</p>
			<IconButton>
				<FaBell size={24} />
			</IconButton>
			<IconButton>
				<FaUserCircle size={24} />
			</IconButton>
		</nav>
	);
}

type AvatarProps = {
	url: string;
};

function Avatar({ url }: AvatarProps) {
	return (
		<div className="relative w-8 h-8 overflow-hidden border-2 border-black rounded-full">
			<Image
				src={url}
				alt="User profile picture"
				layout="fill"
				objectFit="cover"
			/>
		</div>
	);
}
