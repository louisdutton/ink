import type { NextPage } from 'next';
import Head from 'next/head';
import { Meta } from '../components/Meta';
import Input from '../components/Input';
import Link from 'next/link';
import Button from '../components/Button';

const Home: NextPage = () => {
	return (
		<div className="w-full">
			<Head>
				<Meta title="" description={''} />
			</Head>
			<div className="h-screen flex justify-center items-center">
				<div className="p-10 flex flex-col gap-4">
					<h1 className="font-bold text-6xl text-neutral-800">
						Welcome to
						<br />
						<span className="text-orange-400">Lyrics Against Humanity</span>
					</h1>
					<hr className="border-orange-400 border-1 w-full" />
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
};

export default Home;
