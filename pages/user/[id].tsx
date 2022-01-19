import { useRouter } from "next/router";
import { useContext, useEffect, useRef } from "react";
import { useSockets } from "@/components/SocketContext";
import { Meta } from "@/components/Meta";
import List from "@/components/List";
import { User } from "@/server/rooms";
import Image from "next/image";
import { FaOctopusDeploy, FaEdit } from "react-icons/fa";
import Badges from "@/components/Badges";
import IconButton from "../../components/IconButton";

const UserPage = () => {
	const router = useRouter();

	// Else load up the page
	const { id } = router.query;

	return (
		<div className="dark:bg-transparent">
			<Meta description="playing with friends" />
			<div className="flex flex-col items-center justify-center h-screen gap-4">
				<AvatarSection />
				<h1 className="text-2xl font-bold">Dr. Tim</h1>
				<p className="text-sm text-neutral-500">
					Member since: {new Date().toLocaleDateString()}
				</p>
				<Badges />
			</div>
		</div>
	);
};

export default UserPage;

function AvatarSection() {
	return (
		<div className="flex items-center justify-center p-10 overflow-hidden border-8 rounded-full">
			<FaOctopusDeploy size={150} />
		</div>
	);
}
