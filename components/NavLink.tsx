import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
	path: string;
	label: string;
	disabled: boolean;
};

export default function NavLink({ path, label, disabled }: Props) {
	return (
		<button
			disabled={disabled}
			className="px-2 w-24 text-neutral-500 disabled:text-orange-400 font-semibold hover:text-orange-400">
			<Link href={path}>{label}</Link>
		</button>
	);
}
