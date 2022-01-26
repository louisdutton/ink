import { useRouter } from "next/router";
import { useContext, useEffect, useRef } from "react";
import { Meta } from "@/components/Meta";
import List from "@/components/List";
import Image from "next/image";
import { FaOctopusDeploy, FaEdit } from "react-icons/fa";
import Badges from "@/components/Badges";
import IconButton from "../../components/IconButton";
import { useDocument, useDocumentOnce } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Profile } from "@/components/ProfileContext";

const UserPage = () => {
	const router = useRouter();

	// Else load up the page
	const { id } = router.query;
	const [value, loading, error] = useDocumentOnce(
		doc(db, "users", id as string)
	);
	if (!value) return <div />;

	const { username, created: timestamp, badges, xp } = value.data() as Profile;
	const date = new Date(timestamp.seconds * 1000).toLocaleDateString();

	return (
		<div className="dark:bg-transparent">
			<Meta description="playing with friends" />
			<div className="flex flex-col items-center justify-center h-screen gap-4">
				<AvatarSection progress={xp / 100} />
				<h1 className="text-3xl font-bold">{username}</h1>
				<p className="text-sm text-neutral-500">Member since: {date}</p>
				<Badges indices={badges} />
				{/* {error && <strong>Error: {JSON.stringify(error)}</strong>}
				{loading && <span>Document: Loading...</span>}
				{value && <span>Document: {JSON.stringify(value.data())}</span>} */}
			</div>
		</div>
	);
};

export default UserPage;

interface AvatarProps {
	progress: number;
	width?: number;
	radius?: number;
}

const AvatarSection = ({ progress, width = 10, radius = 150 }: AvatarProps) => {
	const circumference = (radius - width * 2) * Math.PI * 2;

	return (
		<div className="relative inline-flex items-center justify-center overflow-hidden rounded-full">
			<FaOctopusDeploy
				size={180}
				className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
			/>
			<svg style={{ width: radius * 2 + "px", height: radius * 2 + "px" }}>
				<circle
					className="text-neutral-300"
					stroke-width={width}
					stroke="currentColor"
					fill="transparent"
					r={radius - 2 * width}
					cx={radius}
					cy={radius}
				/>
				<circle
					className="text-black"
					stroke-width={width}
					stroke-dasharray={circumference}
					stroke-dashoffset={circumference - progress * circumference}
					stroke-linecap="round"
					stroke="currentColor"
					fill="transparent"
					r={radius - 2 * width}
					cx={radius}
					cy={radius}
				/>
			</svg>
		</div>
	);
};
