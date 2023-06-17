import React, { ButtonHTMLAttributes, FC, HTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ ...props }) => {
  return <button {...props}></button>;
};

export default Button;
