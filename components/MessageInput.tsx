import { FormEvent, useRef } from 'react';

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
			<input
				disabled={disabled}
				id="message"
				type="text"
				placeholder="Enter message"
				ref={message}
				autoComplete="off"
				className="px-4 py-2 outline-none transition-colors group border-2 rounded
      placeholder:text-neutral-400
      hover:border-black
      focus:border-neutral-800 focus:bg-neutral-100"
			/>
			<button type="submit" />
		</form>
	);
}
