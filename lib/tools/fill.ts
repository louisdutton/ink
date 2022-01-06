import { getColor, setColor, equal, RGBA, hexToRgb } from './color';
//@ts-ignore
const wasm = await import('wasm-flood-fill');

const BLOCK_SIZE = 4;
const BLACK: RGBA = {
	r: 0,
	g: 0,
	b: 0,
	a: 255
};

export const FillTool = {
	down: (
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		color: string
	) => {
		console.log('filling');

		const width = ctx.canvas.width;
		const height = ctx.canvas.height;
		const colorData = ctx.getImageData(0, 0, width, height);

		const startPosition =
			Math.round(y) * colorData.width + Math.round(x) * BLOCK_SIZE;
		const currentColor = getColor(colorData, startPosition);

		// Black placeholder
		const targetColor = hexToRgb(color);
		console.log(
			startPosition,
			targetColor,
			currentColor,
			colorData.data[startPosition]
		);

		// Return if current and target colors are equal
		if (equal(currentColor, targetColor)) {
			console.log('Fill aborted as current color is equal to target color');
			return;
		}

		if (!wasm) {
			console.log('wasm not initialized');
			return;
		}

		const data = wasm.flood_fill(
			ctx,
			colorData.data,
			Math.round(x),
			Math.round(y),
			targetColor.r,
			targetColor.g,
			targetColor.b,
			200,
			100
		);

		ctx.putImageData(new ImageData(data, width, height), 0, 0);
	}
};
