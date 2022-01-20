import { useRouter } from "next/router";
import { useContext, useEffect, useRef } from "react";
import { Meta } from "@/components/Meta";
import List from "@/components/List";
import Image from "next/image";
import { FaOctopusDeploy, FaEdit } from "react-icons/fa";
import Badges from "@/components/Badges";
import IconButton from "../../components/IconButton";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../lib/firebase";

const UserPage = () => {
	const router = useRouter();

	// Else load up the page
	const { id } = router.query;
	const [value, loading, error] = useDocument(doc(db, "users", id as string));

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
				{error && <strong>Error: {JSON.stringify(error)}</strong>}
				{loading && <span>Document: Loading...</span>}
				{value && <span>Document: {JSON.stringify(value.data())}</span>}
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
