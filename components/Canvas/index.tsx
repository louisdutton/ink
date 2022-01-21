import { useEffect, useRef, useState } from "react";
import useCanvas, { DrawData, Tool } from "@/lib/useCanvas";
import Toolbar from "./Toolbar";

export default function Canvas() {
	const { canvasRef, tool, weight, setColor, setOpacity, setTool, setWeight } =
		useCanvas(960, 540);
	const [hovered, setHovered] = useState<boolean>(false);

	const keyBindings: Record<string, () => void> = {
		KeyD: () => setTool(Tool.Pen),
		KeyE: () => setTool(Tool.Eraser),
		KeyF: () => setTool(Tool.Fill),
	};

	const handleKeyPress = (e: KeyboardEvent) => {
		// e.preventDefault();
		const binding = keyBindings[e.code];
		if (binding) binding();
	};

	const handleScroll = (e: Event) => {
		e.preventDefault();
		setWeight(window.scrollY);
	};

	// key bindings
	useEffect(() => {
		// Event subscriptions
		window.addEventListener("keydown", handleKeyPress);
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
			window.removeEventListener("scroll", handleScroll);
		};
	});

	return (
		<>
			<canvas
				ref={canvasRef}
				onPointerOver={() => setHovered(true)}
				onPointerOut={() => setHovered(false)}
				className="bg-white rounded-lg shadow-lg touch-none cursor-none"
			/>
			<Cursor visible={hovered} weight={weight} />
			<Toolbar
				setColor={setColor}
				setOpacity={setOpacity}
				setWeight={setWeight}
				setTool={setTool}
				activeTool={tool}
			/>
		</>
	);
}

interface CursorProps {
	visible: boolean;
	weight: number;
}

const Cursor = ({ visible, weight }: CursorProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const size = weight + "px";
	const display = visible ? "block" : "hidden";

	const onmove = (e: MouseEvent) => {
		e.preventDefault();
		if (!ref.current) return;

		ref.current.style.top = e.clientY + "px";
		ref.current.style.left = e.clientX + "px";
	};

	useEffect(() => {
		window.addEventListener("mousemove", onmove);

		return () => {
			window.removeEventListener("mousemove", onmove);
		};
	}, []);

	return (
		<div
			ref={ref}
			style={{ width: size, height: size, display }}
			className="fixed -translate-x-1/2 -translate-y-1/2 border rounded-full pointer-events-none border-neutral-900 cursor-none">
			<div className="w-full h-full border border-white rounded-full pointer-events-none" />
		</div>
	);
};
