import Link from 'next/link';
import { Drop } from 'phosphor-react';

export default function Identity() {
	return (
		<Link href="/" passHref>
			<div className="flex items-center cursor-pointer gap-2 dark:text-white">
				<Drop size={30} weight="fill" />
				<p className="text-3xl font-bold border-black rounded-lg font-cursive">
					Ink
				</p>
			</div>
		</Link>
	);
}
