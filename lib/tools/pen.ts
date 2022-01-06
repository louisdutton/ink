export const PenTool = {
	down: () => {},
	up: () => {},
	move: (
		ctx: CanvasRenderingContext2D,
		color: string,
		pressure: number,
		weight: number,
		px: number,
		py: number,
		x: number,
		y: number
	) => {
		ctx.globalCompositeOperation = 'source-over';
		ctx.strokeStyle = color;
		ctx.lineWidth = pressure * weight;
		ctx.beginPath();
		ctx.moveTo(px, py);
		ctx.lineTo(x, y);
		ctx.stroke();
	}
};
