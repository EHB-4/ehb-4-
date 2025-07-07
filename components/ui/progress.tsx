'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const progressVariants = cva(
  'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
  {
    variants: {
      variant: {
        default: 'bg-secondary',
        gradient: 'bg-gradient-to-r from-blue-500/20 to-purple-500/20',
        glass: 'bg-white/10 backdrop-blur-sm border border-white/20',
        neon: 'bg-black/50 border border-cyan-400/30',
      },
      size: {
        sm: 'h-2',
        default: 'h-4',
        lg: 'h-6',
        xl: 'h-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const progressIndicatorVariants = cva(
  'h-full w-full flex-1 transition-all duration-300 ease-out',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        gradient: 'bg-gradient-to-r from-blue-500 to-purple-600',
        glass: 'bg-gradient-to-r from-white/30 to-white/10 backdrop-blur-sm',
        neon: 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-400/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  indicatorVariant?: VariantProps<typeof progressIndicatorVariants>['variant'];
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant, size, indicatorVariant, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(progressVariants({ variant, size }), className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(progressIndicatorVariants({ variant: indicatorVariant }))}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
