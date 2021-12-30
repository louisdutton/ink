import List from '../components/List';
import { UserCircle } from 'phosphor-react';
import Canvas from '../components/Canvas';
import Messages from '../components/Messages';
import { useEffect } from 'react';

type User = {
	uid: string;
	name: string;
	img: string | undefined;
	points: number;
};

export default function Game() {
	const users = null;

	return (
		<div className="h-screen flex items-center">
			<div className="w-screen flex justify-evenly flex-col sm:flex-row">
				{users && (
					<List<any>
						items={users as any[]}
						render={(user: User) => <UserPlate user={user} />}
					/>
				)}
				<Canvas />
				{/* <Messages user={user} /> */}
			</div>
		</div>
	);
}

type UserPlateProps = {
	user: User;
};

function UserPlate({ user }: UserPlateProps) {
	return (
		<div className="flex gap-4 items-center border-b px-5 py-2">
			{/* <p className="w-4 font-bold">{user. + 1}.</p> */}
			<div className="rounded-full h-10 w-10 flex items-center justify-center">
				<UserCircle size={40} />
			</div>
			<p className="font-bold whitespace-nowrap">{user.name}</p>
			<p>0 pts</p>
		</div>
	);
}
