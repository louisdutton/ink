type Props = {
	label: string;
};

export default function Input({ label }: Props) {
	return (
		<div className="flex flex-col gap-1">
			<label htmlFor="username" className="uppercase text-xs text-neutral-400">
				Username
			</label>
			<input
				id="username"
				type="text"
				placeholder="Enter username"
				className="border-2 rounded px-4 py-2 outline-none border-neutral-400 transition-colors group font-semibold
        placeholder:text-neutral-400
        hover:border-black
        focus:border-neutral-800 focus:bg-neutral-100"
			/>
		</div>
	);
}
