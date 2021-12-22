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
					<h1 className="font-bold text-8xl py-2 rounded-xl border-4 border-black overflow-hidden">
						<span className="px-5">draw</span>
						<span className="bg-black px-5 h-full text-white">.ink</span>
					</h1>
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
