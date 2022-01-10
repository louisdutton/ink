import Input from '@/components/Input';
import { Meta } from '@/components/Meta';
import RoomsContainer from '@/components/Rooms';
import { useSockets } from '@/components/SocketContext';
import Button from '@/components/Button';
import { FormEvent, useRef } from 'react';

export default function Home() {
	return (
		<div className="w-full bg-neutral-100 dark:bg-transparent">
			<Meta description={'An online drawing game'} />

			<div className="h-screen flex justify-center items-center">
				<div className="p-4 flex flex-col gap-8 max-w-xl w-full">
					{/* <RoomsContainer /> */}
					<Menu />
				</div>
			</div>
		</div>
	);
}

function Menu() {
	const { username, setUsername } = useSockets();
	const usernameInput = useRef<HTMLInputElement>(null);

	const formHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const value = usernameInput.current?.value;
		if (!value?.trim()) return;
		setUsername(value);
	};

	if (username) return <RoomsContainer />;
	return (
		<form onSubmit={formHandler}>
			<Input ref={usernameInput} label="username" />
			<Button type="submit">Play</Button>
		</form>
	);
}
