import { useState } from 'react';

const COLORS = [
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

export default function Palette() {
	const [active, setActive] = useState<string>(COLORS[0]);
	const handleClick = () => {
		console.log();
	};

	return (
		<ul className="flex gap-1">
			{COLORS.map((color) => (
				<li>
					<ColorButton
						color={color}
						onClick={() => setActive(color)}
						active={color === active}
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
	const activeStyle = active ? 'border-black' : '';
	return (
		<button
			onClick={() => onClick()}
			className={`w-10 h-10 rounded-full border-2 hover:border-black cursor-pointer transition-all ${color} ${activeStyle}`}
		/>
	);
}
