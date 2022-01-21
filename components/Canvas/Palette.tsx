import { useState } from "react";
import { Color } from "@/lib/useCanvas";

const TAILWIND_COLORS = [
	"bg-black",
	"bg-red-500",
	"bg-orange-500",
	"bg-yellow-500",
	"bg-green-500",
	"bg-blue-500",
	"bg-purple-500",
	"bg-pink-500",
	"bg-white",
];

type Props = {
	setColor: (value: Color) => void;
};

export default function Palette({ setColor }: Props) {
	const [active, setActive] = useState<Color>(Color.black);
	const handleClick = (index: number) => {
		setActive(index); // TODO: make active color come from one variable only
		setColor(index);
	};

	return (
		<ul className="flex gap-1.5">
			{TAILWIND_COLORS.map((color, i) => (
				<li key={color} className="flex">
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
	const activeStyle = active ? "" : "";
	return (
		<button
			onClick={() => onClick()}
			className={`w-10 h-10 rounded shadow-inner shadow-neutral-400 cursor-pointer transition-all ${color} ${activeStyle}`}
		/>
	);
}
