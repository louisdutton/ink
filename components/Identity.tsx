import Link from 'next/link';
import Image from 'next/image';

export default function Identity() {
	return (
		<div className="flex-1">
			<div className="flex">
				<Link href="/" passHref>
					<div className="flex items-center gap-4 cursor-pointer">
						{/* <div className="rounded-full border border-background-tertiary overflow-hidden h-[40px] w-[40px]">
              <Image src="/profile-picture.png" alt="" width={40} height={40}/>
            </div> */}
						<p className="text-[1.35rem] font-bold text-black">
							Lyrics Against Humanity
						</p>
					</div>
				</Link>
			</div>
		</div>
	);
}
