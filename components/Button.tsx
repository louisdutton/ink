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
			className="px-4 py-2.5 rounded font-medium text-white bg-neutral-900 hover:bg-neutral-700 transition-colors duration-200 select-none whitespace-nowrap
      dark:bg-neutral-600 dark:hover:bg-neutral-500"
			{...props}>
			{children}
		</button>
	);
};

Button.defaultProps = {
	outline: false
};

export default Button;
