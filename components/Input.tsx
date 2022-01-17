import { forwardRef, HTMLProps, useState } from 'react';

type Props = {
	label: string;
	noLabel?: boolean;
	value?: string | number | readonly string[];
};

const Input = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement> & Props>(
	({ label, noLabel = false, ...props }: Props, ref) => {
		const [focused, setFocused] = useState(false);
		const focusedColor = focused
			? 'dark:text-white text-neutral-800'
			: 'text-neutral-400';

		return (
			<div className="flex flex-col gap-1 w-full">
				{!noLabel && (
					<label
						htmlFor={label}
						className={`uppercase text-xs font-medium transition-colors ${focusedColor}`}>
						{label}
					</label>
				)}
				<input
					{...props}
					id={label}
					ref={ref}
					type="text"
					placeholder={`Enter ${label}`}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					autoComplete="off"
					className="font-medium rounded px-4 py-2 outline-none transition-colors group bg-transparent border-2 border-neutral-300
        placeholder:text-neutral-300 gap-5 focus:border-neutral-800 focus:bg-transparent
        dark:focus:border-white dark:placeholder:text-neutral-500 dark:border-neutral-600"
				/>
			</div>
		);
	}
);

Input.displayName = 'Input';
export default Input;
