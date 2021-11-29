import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
}
const Button = ({ children, className }: ButtonProps) => (
  <button
    className={`${
      className || ''
    } transition hover:text-white hover:bg-primary-light  rounded-full bg-primary text-gray-50 font-bold px-5 py-2`}
  >
    {children}
  </button>
);

export default Button;
