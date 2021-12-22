import React from 'react';

type Props = {
	className?: string;
	children: any;
};

export default function Card({ className, children }: Props) {
	return (
		<div
			className={`rounded-md bg-white cursor-pointer duration-150 shadow-md shadow-orange-100 ${className}`}>
			{children}
		</div>
	);
}
