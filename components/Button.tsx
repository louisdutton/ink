type Props = {
	children: any;
	outline?: boolean;
	icon?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
	children,
	outline = false,
	icon = false,
	onClick,
	...props
}: Props) {
	return (
		<button
			className="px-4 w-36 py-2 rounded-full font-medium tracking-wide shadow-md shadow-orange-200 bg-orange-400 hover:bg-orange-500 text-white transition-colors duration-200 select-none"
			onClick={onClick}
			{...props}>
			{children}
		</button>
	);
}
