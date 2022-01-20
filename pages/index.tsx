import Input from "@/components/Input";
import { Meta } from "@/components/Meta";
import RoomsContainer from "@/components/Rooms";
import Button from "@/components/Button";
import Auth from "../components/Auth";
import Image from "next/image";

export default function Home() {
	return (
		<div className="relative flex items-center justify-center w-full h-screen dark:bg-transparent">
			<Meta description={"An online drawing game"} />
			<div className="max-w-lg ">
				<RoomsContainer />
			</div>
		</div>
	);
}
