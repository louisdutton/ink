import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

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
			className="py-3 font-bold text-white transition-colors duration-200 rounded-full shadow-md select-none px-7 bg-neutral-900 hover:bg-neutral-700 whitespace-nowrap dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
			{...props}>
			{children}
		</button>
	);
};

Button.defaultProps = {
	outline: false,
};

export default Button;
