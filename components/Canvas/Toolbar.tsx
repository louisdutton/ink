import Palette from "./Palette";
import List from "../List";
import IconButton from "../IconButton";
import { Color, Tool } from "@/lib/useCanvas";
import { TiPencil, TiBrush, TiPipette } from "react-icons/ti";
import { BiEraser, BiDroplet } from "react-icons/bi";
import { IconType } from "react-icons";
import { useEffect, useRef, useState } from "react";

interface Props {
	activeTool: Tool;
	setTool: (tool: Tool) => void;
	setWeight: (value: number) => void;
	setColor: (value: Color) => void;
	setOpacity: (value: number) => void;
}

const lerp = (a: number, b: number, t: number) => {
	return a * (1 - t) + b * t;
};

let progress = 0;

const Toolbar = ({
	setTool,
	setWeight,
	setColor,
	setOpacity,
	activeTool,
}: Props) => {
	// const [tool, setTool] = useState<Tool>(Tool.Pen);
	const toolIcons = [TiPencil, TiBrush, BiEraser, BiDroplet, TiPipette];

	return (
		<div className="absolute bottom-0 left-0 z-50 w-screen bg-neutral-100 dark:bg-neutral-800">
			<div className="w-full h-2 border-b bg-neutral-300 border-neutral-300">
				<div
					className="h-2 origin-left bg-green-400 timer"
					style={{ animationDuration: 60 + "s" }}
				/>
			</div>
			<div className="flex items-center gap-4 py-3 origin-left sm:flex-row justify-evenly">
				<Palette setColor={(col) => setColor(col)} />
				<List<IconType>
					items={toolIcons}
					render={(Tool, i) => (
						<button
							onClick={() => setTool(i)}
							className={`flex ${
								activeTool === i ? "text-black" : "text-neutral-400"
							}`}>
							<Tool size={30} />
						</button>
					)}
					className="flex gap-3"
				/>
				<input
					type="range"
					step={10}
					max={200}
					min={10}
					defaultValue={20}
					onChange={(e) => setWeight(parseInt(e.target.value))}
				/>
				<input
					type="range"
					step={0.1}
					max={1}
					min={0}
					defaultValue={1}
					onChange={(e) => setOpacity(parseFloat(e.target.value))}
				/>
			</div>
		</div>
	);
};

export default Toolbar;
