import { FaCrown, FaShieldAlt, FaTrophy, FaAward } from "react-icons/fa";
import { IconType } from "react-icons";
import Image from "next/image";
import List from "./List";

// maps rarity to border colors

interface IRarity {
	name: string;
	badge: string;
	text: string;
}

enum Rarity {
	Common,
	Rare,
	Epic,
	Legendary,
}

const RarityStyle: IRarity[] = [
	{
		name: "Common",
		badge: "border-neutral-300 bg-neutral-400 text-neutral-200",
		text: "text-neutral-400",
	},
	{
		name: "Rare",
		badge: "border-blue-300 bg-blue-500 text-blue-200",
		text: "text-blue-500",
	},
	{
		name: "Epic",
		badge: "border-violet-300 bg-violet-500 text-violet-200",
		text: "text-violet-500",
	},
	{
		name: "Legendary",
		badge: "border-amber-300 bg-amber-500 text-amber-200",
		text: "text-amber-500",
	},
];

interface Badge {
	name: string;
	description: string;
	icon: IconType;
	rarity: Rarity;
}

const BADGES: Badge[] = [
	{
		name: "Founder",
		description: "Since the dawn of time...",
		icon: FaCrown,
		rarity: Rarity.Legendary,
	},
	{
		name: "Moderator",
		description: "Protector of the nine realms.",
		icon: FaShieldAlt,
		rarity: Rarity.Epic,
	},
	{
		name: "Champion",
		description: "Win 100 games.",
		icon: FaTrophy,
		rarity: Rarity.Rare,
	},
	{
		name: "Friendly",
		description: "Recieve a thumbs up from another player.",
		icon: FaAward,
		rarity: Rarity.Common,
	},
];

interface Props {
	indices: number[];
}

const Badges = ({ indices }: Props) => {
	const badges = indices.map((i) => BADGES[i]);

	return (
		<List<Badge>
			items={badges}
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
	const rarity = RarityStyle[data.rarity];

	return (
		<div className="relative">
			<div
				className={`flex justify-center hover:scale-105 duration-300 transition-transform overflow-hidden items-center w-12 h-12 border-4 rounded-xl shadow-inner cursor-pointer has-tooltip group peer relative -z-0 ${rarity.badge}`}>
				<data.icon size={24} className="drop-shadow-md" />
				<div
					className="absolute top-0 w-4 h-24 bg-white pointer-events-none -skew-x-[20deg] -translate-x-12 -translate-y-12 group-hover:duration-700 group-hover:transition-all
            group-hover:bg-[#ffffff33] group-hover:translate-x-12 group-hover:-translate-y-12 transition-none"
				/>
			</div>
			<div
				className="absolute flex flex-col gap-1 opacity-0 peer-hover:opacity-100 transition-opacity bottom-[150%] p-4 text-center z-50 -translate-x-[33%] text-sm bg-white shadow-lg pointer-events-none min-w-[10rem] rounded-xl
       tooltip-triangle">
				<div className="flex gap-2 justify-evenly">
					<p className={`font-bold ${rarity.text}`}>{rarity.name}</p>
					<p className="font-bold whitespace-nowrap">{data.name}</p>
				</div>
				<hr />
				<p className="text-sm text-neutral-500">{data.description}</p>
			</div>
		</div>
	);
};
