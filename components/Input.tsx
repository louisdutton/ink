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
					<label htmlFor={label} className="uppercase text-xs font-semibold text-neutral-400">
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
					className="rounded px-4 py-2 outline-none transition-colors group bg-neutral-200 border-2 border-transparent
        placeholder:text-neutral-400 gap-5 focus:border-black focus:bg-transparent
        dark:bg-neutral-700 dark:focus:border-white dark:placeholder:text-neutral-500"
				/>
			</div>
		);
	}
);

Input.displayName = 'Input';
export default Input;
