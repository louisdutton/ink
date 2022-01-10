// Rita doesnt have a types package
//@ts-ignore

export const GENERAL = [
	'apple',
	'banana',
	'kiwi',
	'lime',
	'lemon',
	'mango',
	'strawberry',
	'blueberry',
	'guava',
	'pear',
	'plum',
	'peach',
	'nectarine',
	'orange',
	'raspberry',
	'lychee'
];

export function getRandomWord(theme: string[]) {
	return theme[(Math.random() * theme.length) >> 0];
}
