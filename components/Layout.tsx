import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { CoreMeta } from './Meta';

type Props = {
	children: any;
};

export default function Layout({ children }: Props) {
	return (
		<>
			<CoreMeta />
			<Header />
			<main className="flex justify-center">{children}</main>
			{/* <Footer /> */}
		</>
	);
}
