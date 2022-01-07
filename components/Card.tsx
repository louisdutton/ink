import React from 'react';

type Props = {
	className?: string;
	children: any;
};

export default function Card({ className, children }: Props) {
	return (
		<div
			className={`rounded-md bg-white dark:bg-neutral-800 border-2 border-transparent dark:border-neutral-700 duration-150 ${className}`}>
			{children}
		</div>
	);
}
