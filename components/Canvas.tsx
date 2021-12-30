import { useEffect, useRef, useState, PointerEvent } from 'react';
import Palette from '../components/Palette';
import List from './List';
import IconButton from './IconButton';
import { PenTool, EraserTool, Variables } from '../lib/tools';
import { Pen, Eraser, PaintBucket, Rectangle, IconProps } from 'phosphor-react';

type Icon = React.ForwardRefExoticComponent<
	IconProps & React.RefAttributes<SVGSVGElement>
>;

const dimensions = {
	width: 700,
	height: 500
};

enum Tool {
	Pen,
	Eraser
}

export default function Canvas() {
	const ref = useRef<HTMLCanvasElement>(null);
	const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
	const [active, setActive] = useState<Tool>(Tool.Pen);
	const [draw, setDraw] = useState(false);
	const [position, setPosition] = useState<[number, number]>();
	const [color, setColor] = useState('#000000');

	const tools = [Pen, Eraser];

	const handlePointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
		const x = e.nativeEvent.offsetX;
		const y = e.nativeEvent.offsetY;

		if (!draw || !position || !ctx) {
			setPosition([x, y]);
			return;
		}

		const px = position[0];
		const py = position[1];

		switch (active) {
			case Tool.Pen:
				PenTool.move(ctx, color, e.pressure, px, py, x, y);
				break;
			case Tool.Eraser:
				EraserTool.move(ctx, px, py, x, y);
				break;
		}

		setPosition([x, y]);
	};

	const handleKeyPress = (e: KeyboardEvent) => {
		e.preventDefault();
		if (!ctx) return;

		switch (e.code) {
			case 'KeyB':
				setActive(Tool.Pen);
				break;
			case 'KeyE':
				setActive(Tool.Eraser);
				break;
			case 'Backspace':
				ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
				break;
		}
	};

	useEffect(() => {
		if (!ref.current) return;

		const canvas = ref.current;
		const ctx = canvas.getContext('2d')!;
		setCtx(ctx); // async

		canvas.style.height = dimensions.height + 'px';
		canvas.style.width = dimensions.width + 'px';

		const scale = window.devicePixelRatio;
		canvas.width = Math.floor(dimensions.width * scale);
		canvas.height = Math.floor(dimensions.height * scale);
		ctx.scale(scale, scale);

		// stroke style
		ctx.lineWidth = 5;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
	}, []);

	// key bindings
	// useEffect(() => {
	// 	window.addEventListener('keydown', handleKeyPress);

	// 	return () => {
	// 		window.removeEventListener('keydown', handleKeyPress);
	// 	};
	// });

	return (
		<div className="flex flex-col">
			{/* <div className="border border-black h-4 w-4" /> */}
			<canvas
				ref={ref}
				className="border-t-2 sm:border-2 sm:rounded-t-xl !border-b-0 cursor-cell"
				onPointerMove={(e) => handlePointerMove(e)}
				onPointerDown={(e) => setDraw(true)}
				onPointerUp={(e) => setDraw(false)}
				// onKeyDown={(e) => handleKeyDown(e)}
			/>
			<div className="border-2 rounded-b-xl py-3 flex flex-col sm:flex-row gap-4 items-center justify-evenly">
				<Palette setColor={(col) => setColor(col)} />
				<List<Icon>
					items={tools}
					render={(Tool, i) => (
						<IconButton onClick={() => setActive(i)} active={active === i}>
							<Tool size={30} weight="duotone" />
						</IconButton>
					)}
					className="flex gap-1"
				/>
			</div>
		</div>
	);
}
