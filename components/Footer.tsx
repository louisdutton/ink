export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="absolute bottom-0 z-50 justify-center hidden w-screen sm:flex text-neutral-400 dark:text-neutral-600">
			<div className="flex flex-col items-center justify-center max-w-5xl p-6 gap-4">
				<p className="text-xs text-text-secondary">
					Copyright © {year}{' '}
					<a
						href="https://github.com/louisdutton"
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
