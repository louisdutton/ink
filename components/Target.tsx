type Props = {
	word: string;
};

export default function Target({ word }: Props) {
	return (
		<p className="absolute flex text-2xl font-bold pointer-events-none top-2 gap-1">
			{Array.from(word).map((letter, i) => (
				<span key={i} className="underline">
					{letter}
				</span>
			))}
		</p>
	);
}
