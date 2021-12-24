import NavLink from './NavLink';
import IconButton from './IconButton';
import { useRouter } from 'next/router';
import { UserCircle } from 'phosphor-react';

type Props = {
	mobile?: boolean;
};

// FIXME: get the mobile navigation working
export default function Navigation({ mobile = false, ...props }: Props) {
	return (
		<nav {...props} className={`h-full flex relative items-center gap-3`}>
			<p className="font-bold">Louis</p>
			<UserCircle size={40} />
		</nav>
	);
}
