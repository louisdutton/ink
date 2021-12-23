export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="z-50 flex justify-center w-screen absolute bottom-0 text-neutral-400">
			<div className="flex flex-col items-center justify-center max-w-5xl p-6 gap-4">
				<p className="text-text-secondary text-xs">
					Copyright © {year}{' '}
					<a
						href="https://louisdutton.com"
						className="underline"
						target="_blank"
						rel="noreferrer">
						Louis Dutton
					</a>
					. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
