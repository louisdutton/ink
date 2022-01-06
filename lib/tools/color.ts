export interface RGBA {
	r: number;
	g: number;
	b: number;
	a: number;
}

/** Returns the RGBA color at the given index in the ImageData. */
export const getColor = (data: ImageData, index: number): RGBA => ({
	r: data.data[index],
	g: data.data[index + 1],
	b: data.data[index + 2],
	a: data.data[index + 3]
});

/**
 * Compares two colors and returns true if they are equal.
 * @todo Currently doesn't take into account alpha values.
 */
export const equal = (colorA: RGBA, colorB: RGBA) => {
	return colorA.r == colorB.r && colorA.g == colorB.g && colorA.b == colorB.b;
};

/** Sets the RGBA color at the given position in the ImageData. */
export function setColor(data: ImageData, index: number, color: RGBA) {
	data.data[index] = color.r;
	data.data[index + 1] = color.g;
	data.data[index + 2] = color.b;
	data.data[index + 3] = color.a;
}

/** Converts a 6-character hexadecimal stting to an RGBA color object */
export function hexToRgb(hex: string): RGBA {
	var c: any;
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		c = hex.substring(1).split('');
		if (c.length == 3) {
			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c = '0x' + c.join('');
		return {
			r: (c >> 16) & 255,
			g: (c >> 8) & 255,
			b: c & 255,
			a: 255
		};
	}
	throw new Error('Bad Hex');
}
