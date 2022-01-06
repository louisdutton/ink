import { getColor, setColor, equal, RGBA, hexToRgb } from './color';
//@ts-ignore
const wasm = await import('wasm-flood-fill');

// FIXME: Not detecting correct colors
export const FillTool = {
	down: (
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		color: string
	) => {
		const width = ctx.canvas.width;
		const height = ctx.canvas.height;
		const imageData = ctx.getImageData(0, 0, width, height);

		const targetColor = hexToRgb(color);
		const data = wasm.flood_fill(
			ctx,
			imageData.data,
			Math.round(x * 2),
			Math.round(y * 2),
			targetColor.r,
			targetColor.g,
			targetColor.b,
			200,
			100
		);

		ctx.putImageData(new ImageData(data, width, height), 0, 0);
	}
};
