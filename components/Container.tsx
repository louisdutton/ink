type Props = {
	children: any;
	className?: string;
};

export default function Grid({ children, className, ...props }: Props) {
	return (
		<div className={`max-w-5xl w-full h-full p-4 ${className}`}>{children}</div>
	);
}
