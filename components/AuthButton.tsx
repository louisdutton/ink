import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	outline?: boolean;
	method: string;
}

const AuthButton = ({
	outline,
	children,
	className,
	method,
	...props
}: Props) => {
	return (
		<button
			className={`rounded font-medium transition-colors duration-200 select-none text-white ${className}`}
			{...props}>
			<div className="flex items-center justify-center relative">
				<div className="p-2 absolute left-0">{children}</div>
				<p className="px-2 py-2 text-center whitespace-nowrap">
					Sign in with {method}
				</p>
			</div>
		</button>
	);
};

AuthButton.defaultProps = {
	outline: false
};

export default AuthButton;
