import Input from "@/components/Input";
import { Meta } from "@/components/Meta";
import RoomsContainer from "@/components/Rooms";
import { useSockets } from "@/components/SocketContext";
import Button from "@/components/Button";
import Auth from "../components/Auth";
import Image from "next/image";

export default function Home() {
	const { username } = useSockets();
	const layoutStyle = username ? "" : "sm:w-2/5";

	return (
		<div className="relative flex justify-end w-full h-screen dark:bg-transparent">
			<Meta description={"An online drawing game"} />
			{!username && (
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
				{username ? <RoomsContainer /> : <Auth />}
			</div>
		</div>
	);
}
