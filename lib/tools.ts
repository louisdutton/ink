export type Variables = {
	prevX: number | null;
	prevY: number | null;
	draw: boolean;
};

type EventHandler = (
	ctx: CanvasRenderingContext2D,
	e: PointerEvent,
	vars: Variables
) => void;

export interface Tool {
	down: EventHandler;
	up: EventHandler;
	move: EventHandler;
}

export const PenTool = {
	down: (ctx: CanvasRenderingContext2D, e: PointerEvent, vars: Variables) =>
		(vars.draw = true),
	up: (ctx: CanvasRenderingContext2D, e: PointerEvent, vars: Variables) =>
		(vars.draw = false),
	move: (
		ctx: CanvasRenderingContext2D,
		color: string,
		pressure: number,
		px: number,
		py: number,
		x: number,
		y: number
	) => {
		ctx.globalCompositeOperation = 'source-over';
		ctx.strokeStyle = color;
		ctx.lineWidth = pressure * 10;
		ctx.beginPath();
		ctx.moveTo(px, py);
		ctx.lineTo(x, y);
		ctx.stroke();
	}
};

export const EraserTool = {
	down: (ctx: CanvasRenderingContext2D, e: PointerEvent, vars: Variables) =>
		(vars.draw = true),
	up: (ctx: CanvasRenderingContext2D, e: PointerEvent, vars: Variables) =>
		(vars.draw = false),
	move: (
		ctx: CanvasRenderingContext2D,
		px: number,
		py: number,
		x: number,
		y: number
	) => {
		ctx.globalCompositeOperation = 'destination-out'; // move this to oneshot
		// ctx.moveTo(px, py);
		// ctx.arc(px, py, 8, 0, Math.PI * 2, false);
		// ctx.fill();

		ctx.lineWidth = 20;
		ctx.beginPath();
		ctx.moveTo(px, py);
		ctx.lineTo(x, y);
		ctx.stroke();
	}
};
