import { FaBell, FaUserCircle, FaSun, FaMoon, FaCoins } from "react-icons/fa";
import { RiCopperCoinFill } from "react-icons/ri";
import Image from "next/image";
import { useSockets } from "./SocketContext";
import IconButton from "./IconButton";
import { useTheme } from "next-themes";
import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
	const { username } = useSockets();
	const [open, setOpen] = useState(false);
	const { theme, setTheme } = useTheme();

	return (
		<nav className={`h-full flex relative items-center gap-4`}>
			<IconButton onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
				{theme === "dark" ? <FaSun size={24} /> : <FaMoon size={22} />}
			</IconButton>
			{/* <p className="font-medium text-neutral-600">{username}</p> */}
			<IconButton className="gap-3 !px-3 font-medium">
				<p>1000</p>
				<FaCoins size={24} />
			</IconButton>
			<IconButton>
				<FaBell size={24} />
			</IconButton>
			<Link href="/user/0">
				<IconButton>
					<FaUserCircle size={24} />
				</IconButton>
			</Link>
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
