import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	active?: boolean;
}

export default function IconButton({
	children,
	className,
	active = false,
	...props
}: Props) {
	return (
		<button
			className={`flex justify-center items-center text-neutral-400 dark:text-neutral-500 hover:bg-neutral-200 hover:text-neutral-500 dark:hover:text-neutral-400 dark:hover:bg-neutral-700 rounded-lg p-2 ${className}`}
			{...props}>
			{children}
		</button>
	);
}
