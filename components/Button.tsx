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
			className="px-4 py-2 rounded font-semibold tracking-wide bg-black hover:bg-white text-white hover:text-black border-2 border-black transition-colors duration-200 select-none"
			onClick={onClick}
			{...props}>
			{children}
		</button>
	);
}
