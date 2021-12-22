import Link from 'next/link';
import Image from 'next/image';

export default function Identity() {
	return (
		<Link href="/" passHref>
			<p className="font-bold text-2xl rounded-xl border-4 border-black flex">
				<div className="px-2">Draw</div>
				<div className="bg-black px-2 text-white">.ink</div>
			</p>
		</Link>
	);
}
