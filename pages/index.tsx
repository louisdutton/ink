import { Meta } from '../components/Meta';
import RoomsContainer from '../components/Rooms';

export default function Home() {
	return (
		<div className="w-full bg-neutral-100 dark:bg-transparent">
			<Meta description={'An online drawing game'} />

			<div className="h-screen flex justify-center items-center">
				<div className="p-4 flex flex-col gap-8 max-w-xl w-full">
					<RoomsContainer />
					{/* <Menu /> */}
				</div>
			</div>
		</div>
	);
}

// function Menu() {
// 	const { user } = useAuth();
// 	return user ? <RoomsContainer /> : <SignIn />;
// }
