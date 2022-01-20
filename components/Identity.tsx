import Link from "next/link";

export default function Identity() {
	return (
		<Link href="/" passHref>
			<div className="flex items-center gap-2 cursor-pointer dark:text-white">
				{/* <Drop size={30} weight="fill" /> */}
				<p className="text-3xl font-bold drop-shadow font-skranji">INK</p>
			</div>
		</Link>
	);
}
