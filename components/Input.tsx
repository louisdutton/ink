import { forwardRef, HTMLProps } from 'react';

type Props = {
	label: string;
	noLabel?: boolean;
	value?: string | number | readonly string[];
};

const Input = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement> & Props>(
	({ label, noLabel = false, ...props }: Props, ref) => {
		return (
			<div className="flex flex-col gap-1 w-full">
				{!noLabel && (
					<label htmlFor={label} className="uppercase text-xs text-neutral-400">
						{label}
					</label>
				)}
				<input
					{...props}
					id={label}
					ref={ref}
					type="text"
					placeholder={`Enter ${label}`}
					autoComplete="off"
					className="font-medium border rounded px-4 py-2 outline-none transition-colors group dark:border-neutral-600 bg-transparent
        placeholder:text-neutral-600
        hover:border-black dark:hover:border-white
        focus:border-neutral-800 focus:bg-neutral-100 dark:focus:bg-neutral-800 dark:focus:border-white"
				/>
			</div>
		);
	}
);

Input.displayName = 'Input';
export default Input;
