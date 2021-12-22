type Props = {
	label: string;
};

export default function Input({ label }: Props) {
	return (
		<div className="flex flex-col gap-1">
			<label htmlFor="username" className="uppercase text-xs text-orange-400">
				Username
			</label>
			<input
				id="username"
				type="text"
				placeholder="Enter username"
				className="border rounded px-4 py-2 w-80 outline-none bg-orange-100 border-orange-200 transition-colors group 
        placeholder:text-orange-300
        hover:border-orange-400
        focus:border-neutral-800 focus:bg-orange-100"
			/>
		</div>
	);
}
