import { ChangeEventHandler, LegacyRef } from 'react';

type Props = {
	label: string;
	noLabel?: boolean;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	ref?: LegacyRef<HTMLInputElement>;
	value?: string | number | readonly string[];
};

export default function Input({
	label,
	noLabel = false,
	ref = null,
	value,
	onChange
}: Props) {
	return (
		<div className="flex flex-col gap-1">
			{!noLabel && (
				<label htmlFor={label} className="uppercase text-xs text-neutral-400">
					{label}
				</label>
			)}
			<input
				id={label}
				ref={ref}
				value={value}
				onChange={onChange}
				type="text"
				placeholder={`Enter ${label}`}
				className="font-medium border-2 rounded px-4 py-2 outline-none transition-colors group
        placeholder:text-neutral-400
        hover:border-black
        focus:border-neutral-800 focus:bg-neutral-100"
			/>
		</div>
	);
}
