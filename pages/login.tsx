import Input from "@/components/Input";
import { Meta } from "@/components/Meta";
import RoomsContainer from "@/components/Rooms";
import Button from "@/components/Button";
import Auth from "../components/Auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState(() => auth.currentUser);
	const layoutStyle = user ? "" : "sm:w-2/5";

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			if (initializing) {
				setInitializing(false);
			}
		});

		return unsubscribe;
	}, [initializing]);

	return (
		<div className="relative flex justify-end w-full h-screen dark:bg-transparent">
			<Meta description={"An online drawing game"} />
			{!user && (
				<div className="relative flex-1 hidden sm:block">
					<Image
						src="/bg.jpeg"
						alt="The winning submission to this month's art competition."
						layout="fill"
						className="pointer-events-none"
						objectFit="cover"
					/>
				</div>
			)}
			<div
				className={`p-10 flex items-center justify-center bg-white dark:bg-neutral-800 shadow-lg z-10 w-full ${layoutStyle} min-w-[25em] transition-all duration-500 ease-in-out`}>
				<Auth />
			</div>
		</div>
	);
}
