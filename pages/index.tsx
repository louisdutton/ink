import Head from 'next/head';
import { Meta } from '../components/Meta';
import Input from '../components/Input';
import Link from 'next/link';
import Button from '../components/Button';
import { Drop } from 'phosphor-react';
import { useEffect } from 'react';
import { messages } from '../lib/firebase';
import { getDocs } from 'firebase/firestore/lite';

type Props = {
	posts: any;
};

export default function Home({ posts }: Props) {
	return (
		<div className="w-full">
			<Head>
				<Meta title="" description={''} />
			</Head>

			<div className="h-screen flex justify-center items-center">
				<div className="p-10 flex flex-col gap-4">
					<div className="flex items-center gap-4 justify-center">
						<Drop size={100} weight="fill" />
						<h1 className="font-bold text-8xl">draw.ink</h1>
					</div>
					<Input label="username" />
					<div className="mt-20 w-full flex justify-center">
						<Link href="/game" passHref>
							<Button>Start</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
