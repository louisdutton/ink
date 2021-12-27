type Props = {
	word: string;
};

export default function Target({ word }: Props) {
	return (
		<p className="absolute font-bold text-2xl top-2 flex gap-1 pointer-events-none">
			{Array.from(word).map((letter) => (
				<span className="underline">{letter}</span>
			))}
		</p>
	);
}
