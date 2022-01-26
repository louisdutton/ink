import { Meta } from "@/components/Meta";
import RoomsContainer from "@/components/Rooms";
import {
	collection,
	DocumentData,
	QueryDocumentSnapshot,
} from "firebase/firestore";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import List from "../components/List";
import { db } from "../lib/firebase";

interface ShopItem {
	name: string;
	price: number;
}

export default function Home() {
	const [value, loading, error] = useCollectionOnce(
		collection(db, "cosmetics")
	);

	const data = value?.docs;

	if (!data) return <div />;

	return (
		<div className="relative flex items-center justify-center w-full h-screen dark:bg-transparent">
			<Meta description={"An online drawing game"} />
			<div className="max-w-lg ">
				<List<QueryDocumentSnapshot<DocumentData>>
					className="grid grid-cols-2 gap-2"
					items={data}
					render={(item) => <ItemCard data={item.data() as ShopItem} />}
				/>
			</div>
		</div>
	);
}

interface ItemProps {
	data: ShopItem;
}

const ItemCard = ({ data }: ItemProps) => {
	return (
		<button className="p-10 transition-all bg-white rounded-md shadow-md hover:ring-4 ring-black focus:outline-none focus:ring-4">
			<h3 className="text-lg font-bold">{data.name}</h3>
			<p>Price: {data.price}</p>
		</button>
	);
};
