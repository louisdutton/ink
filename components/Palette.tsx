import { useState } from 'react';

const TAILWIND_COLORS = [
	'bg-black',
	'bg-red-500',
	'bg-orange-500',
	'bg-yellow-500',
	'bg-green-500',
	'bg-blue-500',
	'bg-purple-500',
	'bg-pink-500',
	'bg-white'
];

const COLORS = [
	'#000000',
	'#ef4444',
	'#f97316',
	'#eab308',
	'#22c55e',
	'#3b82f6',
	'#a855f7',
	'#ec4899',
	'#ffffff'
];

export enum Color {
	black,
	red,
	orange,
	yellow,
	green,
	blue,
	purple,
	pink,
	white
}

type Props = {
	setColor: (color: string) => void;
};

export default function Palette({ setColor }: Props) {
	const [active, setActive] = useState<number>(0);
	const handleClick = (index: number) => {
		setActive(index);
		setColor(COLORS[index]);
	};

	return (
		<ul className="flex gap-1">
			{TAILWIND_COLORS.map((color, i) => (
				<li key={color}>
					<ColorButton
						color={color}
						onClick={() => handleClick(i)}
						active={i === active}
					/>
				</li>
			))}
		</ul>
	);
}

type ColorButtonProps = {
	color: string;
	active?: boolean;
	onClick: Function;
};

function ColorButton({ color, active = false, onClick }: ColorButtonProps) {
	const activeStyle = active ? '!border-black' : '';
	return (
		<button
			onClick={() => onClick()}
			className={`w-10 h-10 rounded-full shadow-md border-4 border-white hover:border-black cursor-pointer transition-all ${color} ${activeStyle}`}
		/>
	);
}
