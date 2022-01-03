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
	const activeStyle = active
		? 'bg-neutral-200 shadow-inner'
		: 'shadow bg-neutral-50';
	return (
		<button
			className={`flex justify-center items-center text-neutral-500 hover:text-black rounded-lg p-2 ${activeStyle} ${className}`}
			onClick={onClick}
			{...props}>
			{children}
		</button>
	);
}
