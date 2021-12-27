import Head from 'next/head';
import Link from 'next/link';
import { Meta } from '../components/Meta';
import Button from '../components/Button';
import SignIn from '../components/SignIn';
import { Drop } from 'phosphor-react';

export default function Home() {
	return (
		<div className="w-full">
			<Head>
				<Meta title="Draw.Ink" description={'An online drawing game'} />
			</Head>

			<div className="h-screen flex justify-center items-center">
				<div className="p-10 flex flex-col gap-8">
					<div className="flex items-center gap-4 justify-center">
						<Drop size={100} weight="fill" />
						<h1 className="font-bold text-8xl">draw.ink</h1>
					</div>
					<SignIn />
					<div className="w-full flex justify-center">
						<Link href="/game" passHref>
							<Button>Play</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
