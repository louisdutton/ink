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
	const activeStyle = active
		? 'bg-neutral-900 shadow-inner !text-black dark:!text-white'
		: 'shadow bg-neutral-50 dark:bg-neutral-600';
	return (
		<button
			className={`flex justify-center items-center text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white rounded-lg p-2 ${activeStyle} ${className}`}
			{...props}>
			{children}
		</button>
	);
}
