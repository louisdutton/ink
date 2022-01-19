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
			<div className="relative flex items-center justify-center">
				<div className="absolute left-0 p-3">{children}</div>
				<p className="px-2 py-3 text-center whitespace-nowrap">
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
