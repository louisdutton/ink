type Props = {
	children: any;
	outline?: boolean;
	icon?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Chip({
	children,
	outline = false,
	icon = false,
	onClick,
	...props
}: Props) {
	return (
		<button
			className="tag h-8 text-sm text-neutral-500 hover:text-black"
			onClick={onClick}>
			#{children}
		</button>
	);
}
