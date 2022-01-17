import Input from '@/components/Input';
import { Meta } from '@/components/Meta';
import RoomsContainer from '@/components/Rooms';
import { useSockets } from '@/components/SocketContext';
import Button from '@/components/Button';
import Auth from '../components/Auth';
import Image from 'next/image';

export default function Home() {
	const { username } = useSockets();

	return (
		<div className="w-full h-screen dark:bg-transparent flex relative">
			<Meta description={'An online drawing game'} />
			<div className="hidden sm:block relative flex-1">
				<Image
					src="/bg.jpg"
					layout="fill"
					className="pointer-events-none"
					objectFit="cover"
				/>
			</div>
			<div className="p-8 flex items-center justify-center bg-white dark:bg-neutral-800 shadow-lg z-10 w-full sm:w-2/5 min-w-[25em]">
				{username ? <RoomsContainer /> : <Auth />}
			</div>
		</div>
	);
}
