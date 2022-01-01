import { useEffect, useRef, useState, PointerEvent } from 'react';
import Palette from '../components/Palette';
import List from './List';
import IconButton from './IconButton';
import { PenTool, EraserTool } from '../lib/tools';
import { Pen, Eraser, PaintBucket, Rectangle, IconProps } from 'phosphor-react';
import { useSockets } from './SocketContext';
import EVENTS from '../config/events';

type Icon = React.ForwardRefExoticComponent<
	IconProps & React.RefAttributes<SVGSVGElement>
>;

export interface DrawData {
	roomId: string;
	px: number;
	py: number;
	x: number;
	y: number;
	tool: Tool;
	color: string;
	pressure: number;
}

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
	const [tool, setTool] = useState<Tool>(Tool.Pen);
	const [drawing, setDrawing] = useState(false);
	const [position, setPosition] = useState<[number, number]>();
	const [color, setColor] = useState('#000000');
	const { socket, roomId } = useSockets();
	const tools = [Pen, Eraser];

	const draw = (drawData: DrawData) => {
		if (!ctx) return;
		const { tool, color, pressure, px, py, x, y } = drawData;

		switch (tool) {
			case Tool.Pen:
				PenTool.move(ctx, color, pressure, px, py, x, y);
				break;
			case Tool.Eraser:
				EraserTool.move(ctx, px, py, x, y);
				break;
		}
	};

	// subscribe draw function to socket event
	socket.on(EVENTS.SERVER.ROOM_DATA, draw);

	const handlePointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
		const x = e.nativeEvent.offsetX;
		const y = e.nativeEvent.offsetY;

		if (!drawing || !position || !ctx) {
			setPosition([x, y]);
			return;
		}

		const drawData: DrawData = {
			tool,
			color,
			pressure: e.pressure,
			px: position[0],
			py: position[1],
			x,
			y,
			roomId: ''
		};

		// draw locally
		draw(drawData);
		setPosition([x, y]);

		// broadcast draw data
		if (roomId) socket.emit(EVENTS.CLIENT.SEND_ROOM_DATA, drawData);
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

	// const handleKeyPress = (e: KeyboardEvent) => {
	// 	e.preventDefault();
	// 	if (!ctx) return;

	// 	switch (e.code) {
	// 		case 'KeyB':
	// 			setActive(Tool.Pen);
	// 			break;
	// 		case 'KeyE':
	// 			setActive(Tool.Eraser);
	// 			break;
	// 		case 'Backspace':
	// 			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	// 			break;
	// 	}
	// };

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
				onPointerDown={(e) => setDrawing(true)}
				onPointerUp={(e) => setDrawing(false)}
				// onKeyDown={(e) => handleKeyDown(e)}
			/>
			<div className="border-2 rounded-b-xl py-3 flex flex-col sm:flex-row gap-4 items-center justify-evenly">
				<Palette setColor={(col) => setColor(col)} />
				<List<Icon>
					items={tools}
					render={(Tool, i) => (
						<IconButton onClick={() => setTool(i)} active={tool === i}>
							<Tool size={30} weight="duotone" />
						</IconButton>
					)}
					className="flex gap-1"
				/>
			</div>
		</div>
	);
}
