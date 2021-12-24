import { useEffect, useRef } from 'react';
import Palette from '../components/Palette';
import Toolbar from '../components/Toolbar';

const dimensions = {
	width: 700,
	height: 500
};

export default function Canvas() {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!ref.current) return;

		const canvas = ref.current;
		const ctx = canvas.getContext('2d')!;
		canvas.style.height = dimensions.height + 'px';
		canvas.style.width = dimensions.width + 'px';
		const rect = canvas.getBoundingClientRect(); // must be after style changes

		const scale = window.devicePixelRatio;
		canvas.width = Math.floor(dimensions.width * scale);
		canvas.height = Math.floor(dimensions.height * scale);
		ctx.scale(scale, scale);

		// stroke style
		ctx.lineWidth = 5;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';

		// Selecting all the div that has a class of clr
		// let clrs = document.querySelectorAll('.clr');
		// Converting NodeList to Array
		// clrs = Array.from(clrs);

		// clrs.forEach((clr) => {
		// 	clr.addEventListener('click', () => {
		// 		ctx.strokeStyle = clr.dataset.clr;
		// 	});
		// });

		// variables
		let prevX: number;
		let prevY: number;
		let draw = false;

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
	});

	return (
		<div className="flex flex-col">
			<canvas ref={ref} className="border-2 rounded-t-xl border-b-0" />
			<div className="border-2 rounded-b-xl py-2 px-3 flex gap-4 items-center justify-between">
				<Palette />
				<Toolbar />
			</div>
		</div>
	);
}
