import IconButton from './IconButton';
import { Pen, Eraser, PaintBucket, Rectangle } from 'phosphor-react';
import { useState } from 'react';

export enum Tool {
	pen,
	eraser,
	fill,
	shape
}

export default function Toolbar() {
	const [active, setActive] = useState<Tool>(Tool.pen);

	return (
		<ul className="flex gap-1">
			<li>
				<IconButton
					onClick={() => setActive(Tool.pen)}
					active={active === Tool.pen}>
					<Pen size={30} weight="duotone" />
				</IconButton>
			</li>
			<li>
				<IconButton
					onClick={() => setActive(Tool.eraser)}
					active={active === Tool.eraser}>
					<Eraser size={30} weight="duotone" />
				</IconButton>
			</li>
			<li>
				<IconButton
					onClick={() => setActive(Tool.fill)}
					active={active === Tool.fill}>
					<PaintBucket size={30} weight="duotone" />
				</IconButton>
			</li>
			<li>
				<IconButton
					onClick={() => setActive(Tool.shape)}
					active={active === Tool.shape}>
					<Rectangle size={30} weight="duotone" />
				</IconButton>
			</li>
		</ul>
	);
}
