import React from 'react';

type Key = React.Key | null | undefined;
export type RenderFunction<T> = (item: T, i?: number) => React.ReactNode;
export type KeyFunction<T> = (item: T, i: number) => Key;

type Props<T> = {
	items: Array<T>;
	render: RenderFunction<T>;
	keyFn?: KeyFunction<T>;
	className?: string;
};

export default function List<T>({
	items,
	render = (item: T) => <div />,
	keyFn = (item: T, i: number) => i,
	className = ''
}: Props<T>) {
	return (
		<ul className={className}>
			{items.map((item, i) => (
				<li
					key={keyFn(item, i)}
					className="list-in"
					style={{ animationDelay: `${i * 0.05}s` }}>
					{render(item, i)}
				</li>
			))}
		</ul>
	);
}
