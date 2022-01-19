import { FaCrown, FaShieldAlt, FaTrophy, FaAward } from "react-icons/fa";
import { IconType } from "react-icons";
import { User } from "@/server/rooms";
import Image from "next/image";
import List from "./List";
import Tooltip from 'react-tooltip'

// maps rarity to border colors
enum Rarity {
	Common = "border-neutral-300 bg-neutral-500 text-amber-200",
	Rare = "border-blue-300 bg-blue-500 text-blue-200",
	Epic = "border-purple-300 bg-purple-500 text-purple-200",
	Legendary = "border-amber-300 bg-amber-500 text-amber-200",
}

interface Badge {
	name: string;
	description: string;
	icon: IconType;
	rarity: Rarity;
}

const BADGES: Badge[] = [
	{
		name: "Founder",
		description: "Inking since the dawn of time.",
		icon: FaCrown,
		rarity: Rarity.Legendary,
	},
	{
		name: "Moderator",
		description: "Protector of the realm.",
		icon: FaShieldAlt,
		rarity: Rarity.Epic,
	},
	{
		name: "Champion",
		description: "Came first place in over 500 games.",
		icon: FaTrophy,
		rarity: Rarity.Epic,
	},
	{
		name: "Pillar of the community",
		description: "Recieved over 1k likes.",
		icon: FaAward,
		rarity: Rarity.Rare,
	},
];

const Badges = () => {
	return (
		<List<Badge>
			items={BADGES}
			render={(badge) => <Badge data={badge} />}
			className="flex gap-2"
		/>
	);
};

export default Badges;

interface BadgeProps {
	data: Badge;
}

const Badge = ({ data }: BadgeProps) => {
	return (
		<div
			className={`flex overflow-hidden items-center justify-center w-12 h-12 border-4 rounded-lg shadow-inner cursor-pointer relative ${data.rarity}`}>
			{/* <p>{data.name}</p> */}
			<data.icon size={24} className="drop-shadow-md" />
			<div className="light" />
		</div>
	);
};
