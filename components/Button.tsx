import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ className, children }) => {
  return <div className={cn('', className)}>{children}</div>;
};

export default Button;
