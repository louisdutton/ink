import Link from 'next/link';
import { Drop } from 'phosphor-react';

export default function Identity() {
	return (
		<Link href="/" passHref>
			<div className="flex items-center gap-2 cursor-pointer">
				<Drop size={24} weight="fill" />
				<p className="font-bold text-xl rounded-lg border-black">draw.ink</p>
			</div>
		</Link>
	);
}
