type Props = {
	children: any;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	active?: boolean;
};

export default function IconButton({
	children,
	className,
	onClick,
	active = false,
	...props
}: Props) {
	const activeStyle = active ? '!border-black pointer pointer-events-none' : '';
	return (
		<button
			className={`flex justify-center items-center border-2 rounded-lg p-1 hover:border-neutral-400 ${activeStyle} transition-colors  ${className}`}
			onClick={onClick}
			{...props}>
			{children}
		</button>
	);
}
