export default class History {
	ctx: CanvasRenderingContext2D;
	depth: number;
	states: string[];

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
		this.depth = -1;
		this.states = [];
	}

	undo() {
		if (this.depth > 0) {
			this.depth--;
			const img = new Image();
			img.src = this.states[this.depth];
			img.onload = () => {
				this.ctx.drawImage(img, 0, 0);
			};
		}
	}

	redo() {
		if (this.depth < history.length - 1) {
			this.depth++;
			const img = new Image();
			img.src = this.states[this.depth];
			img.onload = () => {
				this.ctx.drawImage(img, 0, 0);
			};
		}
	}

	push() {
		this.depth++;
		if (this.depth < this.states.length) {
			this.states.length = this.depth;
		}
		this.states.push(this.ctx.canvas.toDataURL());
	}
}
