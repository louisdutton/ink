// import { FcGoogle } from 'react-icons/fc';
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";
import { FormEvent, useRef } from "react";
import AuthButton from "./AuthButton";
import Button from "./Button";
import Input from "./Input";
import { useSockets } from "./SocketContext";

export default function SignIn() {
	const usernameInput = useRef<HTMLInputElement>(null);
	const { setUsername } = useSockets();

	const formHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const value = usernameInput.current?.value;
		if (!value?.trim()) return;
		setUsername(value);
	};

	return (
		<form
			onSubmit={formHandler}
			className="flex flex-col w-full h-full max-w-sm justify-evenly">
			<div className="flex flex-col items-center gap-1">
				<h1 className="text-xl font-medium text-center">
					<span className="text-neutral-500 dark:text-neutral-400">
						Welcome to draw.
					</span>
					<br />
					<span className="text-9xl font-skranji">INK</span>
				</h1>
				{/* <p className="text-xl text-neutral-500 dark:text-neutral-400">
					Sign in to continue...
				</p> */}
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<AuthButton
						className="bg-[#5865F2] hover:bg-[#6572Ff]"
						method="Discord">
						<FaDiscord size={26} />
					</AuthButton>
					<AuthButton className="bg-[#555] hover:bg-[#666]" method="Github">
						<FaGithub size={25} />
					</AuthButton>
					<AuthButton
						className="bg-[#4285F4] hover:bg-[#4E90FF]"
						method="Google">
						<FaGoogle size={24} />
					</AuthButton>
				</div>
				<div className="relative my-4 text-xs tracking-wider uppercase text-neutral-400">
					<hr className="border-neutral-300 dark:border-neutral-500" />
					<p className="absolute top-0 px-4 font-medium -translate-x-1/2 -translate-y-1/2 bg-white left-1/2 dark:bg-neutral-800 whitespace-nowrap">
						or continue anonymously
					</p>
				</div>
				<Input ref={usernameInput} label="username" />
			</div>
			<Button type="submit">Get started</Button>
		</form>
	);
}
