import React from 'react';

type Key = React.Key | null | undefined;
export type RenderFunction<T> = (item: T) => React.ReactNode;
export type KeyFunction<T> = (item: T, i: number) => Key;

type Props<T> = {
	items: Array<T>;
	render: RenderFunction<T>;
	keyFn?: KeyFunction<T>;
};

export default function List<T>({
	items,
	render = (item: T) => <div />,
	keyFn = (item: T, i: number) => i
}: Props<T>) {
	return (
		<ul className="flex flex-col gap-2">
			{items.map((item, i) => (
				<li
					key={keyFn(item, i)}
					className="list-in"
					style={{ animationDelay: `${i * 0.05}s` }}>
					{render(item)}
				</li>
			))}
		</ul>
	);
}
