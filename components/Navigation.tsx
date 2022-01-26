import { FaBell, FaUserCircle, FaSun, FaMoon, FaCoins } from "react-icons/fa";
import { RiCopperCoinFill } from "react-icons/ri";
import Image from "next/image";
// import { useSockets } from "../lib/firebase";
import IconButton from "./IconButton";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useProfile } from "./ProfileContext";
//@ts-ignore
import AnimatedNumber from "animated-number-react";

export default function Navigation() {
	const [open, setOpen] = useState(false);
	const { theme, setTheme } = useTheme();
	const [user, loading, error] = useAuthState(auth);
	const profile = useProfile();

	const handleSignOut = () => {
		signOut(auth).catch((error) => console.log(error));
	};

	return (
		<nav className={`h-full flex relative items-center gap-4`}>
			{/* <IconButton onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
				{theme === "dark" ? <FaSun size={24} /> : <FaMoon size={22} />}
			</IconButton> */}
			{/* <p className="font-medium text-neutral-600">{username}</p> */}
			<IconButton className="gap-3 !px-3 font-medium">
				<AnimatedNumber
					value={profile?.coins}
					formatValue={(value: number) => value.toFixed(0)}
					easing="linear"
				/>
				<FaCoins size={24} />
			</IconButton>
			{user && <button onClick={() => handleSignOut()}>sign out</button>}
			<IconButton>
				<FaBell size={24} />
			</IconButton>
			{user ? (
				<Link href={"/user/" + user.uid} passHref>
					<IconButton>
						<FaUserCircle size={24} />
					</IconButton>
				</Link>
			) : (
				<IconButton>
					<FaUserCircle size={24} />
				</IconButton>
			)}
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
