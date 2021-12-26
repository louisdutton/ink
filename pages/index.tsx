import Head from 'next/head';
import { Meta } from '../components/Meta';
import Input from '../components/Input';
import Link from 'next/link';
import Button from '../components/Button';
import { Drop, GoogleLogo, GithubLogo } from 'phosphor-react';
import {
	GoogleAuthProvider,
	GithubAuthProvider,
	signInWithPopup
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import IconButton from '../components/IconButton';

export default function Home() {
	const provider = {
		google: new GoogleAuthProvider(),
		github: new GithubAuthProvider()
	};

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
					<div className="flex gap-4">
						<Input label="username" />
						<div className="w-0.5 bg-neutral-100 rounded-full" />
						<div className="grid gap-2">
							<IconButton
								onClick={() => signInWithPopup(auth, provider.google)}>
								<GoogleLogo size={40} weight="fill" />
							</IconButton>
							<IconButton
								onClick={() => signInWithPopup(auth, provider.github)}>
								<GithubLogo size={40} weight="fill" />
							</IconButton>
						</div>
					</div>
					<div className="w-full flex justify-center">
						<Link href="/game" passHref>
							<Button>Start</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
