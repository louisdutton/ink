type Props = {
	children: any
  className?: string
	onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function IconButton({ children, className, onClick, ...props }: Props) {
	return (
		<button
			className={`flex justify-center items-center font-light ${className}`}
			onClick={onClick}
			{...props}>
			{children}
		</button>
	)
}
