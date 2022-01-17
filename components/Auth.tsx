// import { FcGoogle } from 'react-icons/fc';
import { FaDiscord, FaGithub, FaGoogle } from 'react-icons/fa';
import { FormEvent, useRef } from 'react';
import AuthButton from './AuthButton';
import Button from './Button';
import IconButton from './IconButton';
import Input from './Input';
import { useSockets } from './SocketContext';

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
			className="flex flex-col gap-4 w-full max-w-sm">
			<h1 className="font-bold text-5xl text-center py-4">Welcome</h1>
			<div className="flex flex-col gap-2">
				<AuthButton
					className="bg-[#5865F2] border-[#5865F2] hover:bg-[#6572Ff] hover:border-[#6572Ff] text-white"
					method="Discord">
					<FaDiscord size={28} />
				</AuthButton>
				<AuthButton
					className="bg-neutral-700 border-neutral-700 text-white hover:bg-neutral-600 hover:border-neutral-600"
					method="Github">
					<FaGithub size={27} />
				</AuthButton>
				<AuthButton
					className="text-white bg-blue-500 border-blue-500 hover:border-blue-400 hover:bg-blue-400"
					method="Google">
					<FaGoogle size={26} />
				</AuthButton>
			</div>
			<div className="relative text-neutral-400 my-4 uppercase text-xs tracking-wider">
				<hr className="border-neutral-300 dark:border-neutral-500" />
				<p className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-neutral-800 px-4 whitespace-nowrap">
					or continue anonymously
				</p>
			</div>
			<Input ref={usernameInput} label="username" />
			<div className="my-2" />
			<Button type="submit">Play</Button>
		</form>
	);
}
