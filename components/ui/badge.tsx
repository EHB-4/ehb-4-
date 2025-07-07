import React from 'react';

/**
 * Placeholder Badge component. Update with your own design as needed.
 */
export function Badge({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLSpanElement>>) {
  return (
    <span
      {...props}
      style={{
        display: 'inline-block',
        background: '#f3f4f6',
        color: '#374151',
        borderRadius: 12,
        padding: '2px 8px',
        fontSize: 12,
        ...props.style,
      }}
    >
      {children}
    </span>
  );
}
