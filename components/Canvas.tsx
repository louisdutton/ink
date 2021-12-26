import { setUncaughtExceptionCaptureCallback } from 'process';
import { useEffect, useRef, useState } from 'react';
import Palette from '../components/Palette';
import Toolbar from '../components/Toolbar';

const dimensions = {
	width: 700,
	height: 500
};

export default function Canvas() {
	const ref = useRef<HTMLCanvasElement>(null);
	const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

	useEffect(() => {
		if (!ref.current) return;

		const canvas = ref.current;
		const ctx = canvas.getContext('2d')!;
		setCtx(ctx); // async

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

		const handlePointerDown = (e: PointerEvent) => (draw = true);
		const handlePointerUp = (e: PointerEvent) => (draw = false);
		const handlePointerMove = (e: PointerEvent) => {
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
		};

		// subscribe
		canvas.addEventListener('pointerdown', handlePointerDown);
		window.addEventListener('pointerup', handlePointerUp);
		canvas.addEventListener('pointermove', handlePointerMove);

		// unsubscribe
		return () => {
			canvas.removeEventListener('pointerdown', handlePointerDown);
			window.removeEventListener('pointerup', handlePointerUp);
			canvas.removeEventListener('pointermove', handlePointerMove);
		};
	}, []);

	const setColor = (color: string) => {
		if (ctx) ctx.strokeStyle = color;
	};

	return (
		<div className="flex flex-col">
			<canvas
				ref={ref}
				className="border-t-2 sm:border-2 sm:rounded-t-xl !border-b-0"
			/>
			<div className="border-2 rounded-b-xl py-3 flex flex-col sm:flex-row gap-4 items-center justify-evenly">
				<Palette setColor={setColor} />
				<Toolbar />
			</div>
		</div>
	);
}
