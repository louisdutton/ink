import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	outline?: boolean;
}

const Button = ({ outline, children, ...props }: Props) => {
	return (
		<button
			className="px-4 py-2 rounded font-medium bg-neutral-700 hover:bg-neutral-600 text-white border border-neutral-500 hover:border-neutral-400 transition-colors duration-200 select-none whitespace-nowrap"
			{...props}>
			{children}
		</button>
	);
};

Button.defaultProps = {
	outline: false
};

export default Button;
