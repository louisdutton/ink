export function initInk(
	canvas: HTMLCanvasElement,
	width: number,
	height: number
) {
	const rect = canvas.getBoundingClientRect();
	const ctx = canvas.getContext('2d')!;
	canvas.style.height = height + 'px';
	canvas.style.width = width + 'px';

	const scale = window.devicePixelRatio;
	canvas.width = Math.floor(width * scale);
	canvas.height = Math.floor(height * scale);
	ctx.scale(scale, scale);

	// stroke style
	ctx.lineWidth = 5;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';

	let prevX: number;
	let prevY: number;
	let draw = false;

	// Selecting all the div that has a class of clr
	// let clrs = document.querySelectorAll('.clr');
	// Converting NodeList to Array
	// clrs = Array.from(clrs);

	// clrs.forEach((clr) => {
	// 	clr.addEventListener('click', () => {
	// 		ctx.strokeStyle = clr.dataset.clr;
	// 	});
	// });

	window.addEventListener('pointerdown', (e) => (draw = true));
	window.addEventListener('pointerup', (e) => (draw = false));

	canvas.addEventListener('pointermove', (e) => {
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		if (prevX == null || prevY == null || !draw) {
			prevX = x;
			prevY = y;
			return;
		}

		let currentX = x;
		let currentY = y;

		ctx.lineWidth = e.pressure * 10;
		ctx.beginPath();
		ctx.moveTo(prevX, prevY);
		ctx.lineTo(currentX, currentY);
		ctx.stroke();

		prevX = currentX;
		prevY = currentY;
	});
}
