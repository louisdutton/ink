import { useEffect } from 'react';

type Props = {
	/** The string of ABC notation to be parsed. */
	notation: string;
	/** Options for the ABC parser. */
	parserParams?: object;
	/** Options for the ABC engraver. */
	engraverParams?: object;
	/** Options for the ABC renderer. */
	renderParams?: object;
	index: number;
};

async function loadABC() {
	//@ts-ignore
	//FIXME abc types
	return await import('abcjs');
}

/** Renders ABC notation using abcjs.
 * ```
 * <ABC notation="A B C A "/>
 * ```
 */
export default function ABC({
	notation,
	parserParams = {},
	engraverParams = { responsive: 'resize' },
	renderParams = { viewportHorizontal: true }
}: Props) {
	const id = 'abcjs-result-' + Math.random();

	useEffect(() => {
		loadABC().then((abc: any) => {
			const res = abc.renderAbc(
				id,
				notation,
				parserParams,
				engraverParams,
				renderParams
			);
		});
	});

	return (
		<div className="w-full">
			<div id={id} className="w-full" />
		</div>
	);
}
