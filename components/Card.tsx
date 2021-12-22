import React from 'react';

type Props = {
	className?: string;
	children: any;
};

export default function Card({ className, children }: Props) {
	return (
		<div
			className={`rounded-md bg-white border cursor-pointer duration-150 shadow-md ${className}`}>
			{children}
		</div>
	);
}
