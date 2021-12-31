import React from 'react';

type Props = {
	className?: string;
	children: any;
};

export default function Card({ className, children }: Props) {
	return (
		<div className={`rounded-md bg-white border-2 duration-150 ${className}`}>
			{children}
		</div>
	);
}
