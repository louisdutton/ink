import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

const Typography = {
	h1: (props: Props) => (
		<h1 className="text-5xl font-bold text-black">{props.children}</h1>
	),
	h2: (props: Props) => (
		<h2 className="text-2xl font-bold">{props.children}</h2>
	),
	h3: (props: Props) => <h3 className="text-xl font-bold">{props.children}</h3>,
	p: (props: Props) => <p className="text-neutral-500">{props.children}</p>,
	date: (props: Props) => (
		<time className="text-neutral-500 text-sm">{props.children}</time>
	),
	label: (props: Props) => (
		<p className="uppercase text font-medium text-sm text-violet-600">
			{props.children}
		</p>
	)
};

export default Typography;
