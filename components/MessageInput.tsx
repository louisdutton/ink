import { FormEvent, useRef } from 'react';
import Input from './Input';

type Props = {
	action: (content: string) => Promise<void>;
	disabled: boolean;
};

export default function MessageInput({ action, disabled }: Props) {
	const message = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!message.current?.value) return;

		action(message.current.value);
		message.current.value = '';
	};

	return (
		<form onSubmit={handleSubmit}>
			<Input
				label="message or guess"
				ref={message}
				autoComplete="off"
				spellCheck="false"
			/>
			<button type="submit" />
		</form>
	);
}
