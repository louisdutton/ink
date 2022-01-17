import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	outline?: boolean;
}

const AuthButton = ({ outline, children, className, ...props }: Props) => {
	return (
		<button
			className={`px-4 py-2 rounded font-medium transition-colors duration-200 select-none whitespace-nowrap flex justify-center border-2 ${className}`}
			{...props}>
			<div className="flex items-center gap-4">{children}</div>
		</button>
	);
};

AuthButton.defaultProps = {
	outline: false
};

export default AuthButton;
