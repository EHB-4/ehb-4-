import React from 'react';
import { cn } from '@/lib/utils';

interface MyComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export const MyComponent: React.FC<MyComponentProps> = ({ 
  className, 
  children 
}) => {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
};

export default MyComponent;
