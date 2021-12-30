import { FormEvent, FormEventHandler, useState } from 'react';

type Props = {
	action: (content: string) => Promise<void>;
};

export default function MessageInput({ action }: Props) {
	const [formValue, setFormValue] = useState<string>('');

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (formValue === '') return;

		action(formValue);
		setFormValue('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				id="message"
				type="text"
				placeholder="Enter message"
				value={formValue}
				autoComplete="off"
				onChange={(e) => setFormValue(e.target.value)}
				className="px-4 py-2 outline-none transition-colors group border-2 rounded
  placeholder:text-neutral-400
  hover:border-black
  focus:border-neutral-800 focus:bg-neutral-100"
			/>
			<button type="submit" />
		</form>
	);
}
