import NavLink from './NavLink';
import IconButton from './IconButton';
import { useRouter } from 'next/router';

type Page = {
	label: string;
	slug: string;
};

const pages: Page[] = [
	{ label: 'Home', slug: '/' },
	{ label: 'Projects', slug: '/projects' },
	{ label: 'Posts', slug: '/posts' },
	{ label: 'Contact', slug: '/contact' }
];

type Props = {
	mobile?: boolean;
};

const OFFSETS = [
	'translate-x-0',
	'translate-x-24',
	'translate-x-58',
	'translate-x-82'
];

// FIXME: get the mobile navigation working
export default function Navigation({ mobile = false, ...props }: Props) {
	const router = useRouter();
	const index = pages.findIndex((page: Page) => router.asPath === page.slug);
	const offset = OFFSETS[index];

	return (
		<nav {...props} className={`hidden h-full sm:flex relative`}>
			<ul className="flex items-center">
				{pages.map((page, i) => (
					<li key={i} className="flex h-full">
						<NavLink
							path={page.slug}
							label={page.label}
							disabled={i === index}
						/>
					</li>
				))}
			</ul>
			<div
				className={`absolute h-0.5 w-24 bottom-0 left-0 bg-orange-400 transition-transform ${offset}`}
			/>
		</nav>
	);
}
