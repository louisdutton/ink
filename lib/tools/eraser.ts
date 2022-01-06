export const EraserTool = {
	down: () => {},
	up: () => {},
	move: (
		ctx: CanvasRenderingContext2D,
		px: number,
		py: number,
		x: number,
		y: number,
		weight: number
	) => {
		// ctx.globalCompositeOperation = 'destination-out'; // move this to oneshot

		ctx.strokeStyle = '#ffffff';
		ctx.lineWidth = weight;
		ctx.beginPath();
		ctx.moveTo(px, py);
		ctx.lineTo(x, y);
		ctx.stroke();
	}
};
