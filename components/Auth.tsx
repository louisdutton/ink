// import { FcGoogle } from 'react-icons/fc';
import { FaDiscord, FaGithub, FaGoogle } from 'react-icons/fa';
import { FormEvent, useRef } from 'react';
import AuthButton from './AuthButton';
import Button from './Button';
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
			className="flex flex-col gap-4 w-full max-w-sm justify-evenly h-full">
			<h1 className="font-bold text-7xl text-center font-cursive">ink</h1>
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
				<div className="relative text-neutral-400 my-4 uppercase text-xs tracking-wider">
					<hr className="border-neutral-300 dark:border-neutral-500" />
					<p className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-neutral-800 px-4 whitespace-nowrap font-medium">
						or continue anonymously
					</p>
				</div>
				<Input ref={usernameInput} label="username" />
			</div>
			<Button type="submit">Play</Button>
		</form>
	);
}
