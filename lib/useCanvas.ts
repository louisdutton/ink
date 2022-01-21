import { useEffect, useRef, useState } from "react";
import { createContext } from "vm";
import History from "./history";
import { PenTool, EraserTool } from "./tools";

export enum Color {
	black,
	red,
	orange,
	yellow,
	green,
	blue,
	purple,
	pink,
	white,
}

const COLORS = [
	"#000000",
	"#ef4444",
	"#f97316",
	"#eab308",
	"#22c55e",
	"#3b82f6",
	"#a855f7",
	"#ec4899",
	"#ffffff",
];

export enum Tool {
	Pen,
	Brush,
	Eraser,
	Fill,
	Pipette,
}

export interface DrawData {
	roomId: string;
	px: number;
	py: number;
	x: number;
	y: number;
	pressure: number;
}

interface Position {
	x: number;
	y: number;
}

// interface Props {
// 	width: number;
// 	height: number;
// }

let drawing: boolean;
let px: number;
let py: number;
let pw: number; // prev weight
let path: Path2D;
let color = "#000000";
let tool = Tool.Pen;
let weight = 10;
let opacity = 1.0;

const setColor = (value: Color) => {
	color = COLORS[value];
};

const setTool = (value: Tool) => {
	tool = value;
};

const setWeight = (value: number) => {
	weight = value;
};

const setOpacity = (value: number) => {
	opacity = value;
};

const useCanvas = (width: number, height: number) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
	// const [drawing, setDrawing] = useState<boolean>(false);
	// const [path, setPath] = useState<Path2D>();
	// const [prevPosition, setPrevPosition] = useState<Position>({ x: -1, y: -1 });
	// const [opacity, setOpacity] = useState(1.0);
	// const [weight, setWeight] = useState(10);
	const [history, setHistory] = useState<History>();

	const draw = ({ pressure, px, py, x, y }: DrawData) => {
		if (!ctx || !weight || !path) return;

		// eraser or pen
		if (tool < 3) {
			// line width
			const lineWidth = pressure * weight;
			ctx.lineWidth = pw + lineWidth / 2; // avg
			pw = lineWidth;

			ctx.strokeStyle = tool === Tool.Eraser ? "#ffffff" : color;
			ctx.globalAlpha = opacity;
			path.quadraticCurveTo(px, py, px + (x - px) / 2, py + (y - py) / 2);
			// ctx.stroke(path);
		}
	};

	const onup = (e?: PointerEvent) => {
		// e?.preventDefault();
		ctx?.stroke(path); // FIXME: yep

		drawing = false;
		path?.closePath();
		history?.push();
	};

	const ondown = (e: PointerEvent) => {
		// e.preventDefault();

		drawing = true;

		const x = e.offsetX;
		const y = e.offsetY;
		const pressure = e.pressure;

		// create new path
		path = new Path2D();
		// path.moveTo(x, y);

		if (tool < 2) {
			draw({ roomId: "", pressure, x, y, px: x, py: y });
		} else {
			// FillTool.down(x, y, window.devicePixelRatio);
		}
	};

	const onmove = (e: PointerEvent) => {
		// e.preventDefault();

		const x = e.offsetX;
		const y = e.offsetY;

		if (!drawing) {
			px = x;
			py = y;
			return;
		}

		// draw locally
		draw({
			roomId: "",
			pressure: e.pressure,
			px,
			py,
			x,
			y,
		});

		px = x;
		py = y;
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) throw new Error("Canvas is undefined");

		const ctx = canvas.getContext("2d")!;

		canvas.style.height = height + "px";
		canvas.style.width = width + "px";

		const scale = window.devicePixelRatio;
		canvas.width = Math.floor(width * scale);
		canvas.height = Math.floor(height * scale);
		ctx.scale(scale, scale);

		ctx.imageSmoothingEnabled = true;
		ctx.imageSmoothingQuality = "high";

		// fill white
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		// stroke style
		ctx.lineWidth = 5;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";

		// init history
		const history = new History(ctx);
		history.push(); // push intial state

		setCtx(ctx);
		setHistory(history);
	}, [width, height]);

	// event effect
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) throw new Error("Canvas is undefined");

		// global pointer up event so it works outside of canvas
		window.addEventListener("pointerup", onup);
		canvas.addEventListener("pointerdown", ondown);
		canvas.addEventListener("pointermove", onmove);
		canvas.addEventListener("blur", () => onup());

		return () => {
			window.removeEventListener("pointerup", onup);
			canvas.removeEventListener("pointerdown", ondown);
			canvas.removeEventListener("pointermove", onmove);
			canvas.removeEventListener("blur", () => onup());
		};
	});

	return { canvasRef, tool, weight, setColor, setOpacity, setTool, setWeight };
};

export default useCanvas;
