import { PenTool } from '@/lib/tools/pen';
import { EraserTool } from '@/lib/tools/eraser';

// FIXME: unable to load WASM module (fill tool) into tests
describe('Tools', function () {
	const ctx = document.createElement('canvas').getContext('2d')!;

	describe('Pen Tool', function () {
		test('onmove', () => {
			PenTool.move(ctx, '#000000', 0.5, 10, 0, 0, 0, 0);
		});
	});

	describe('Eraser Tool', function () {
		test('onmove', () => {
			EraserTool.move(ctx, 0, 0, 0, 0, 10);
		});
	});
});
