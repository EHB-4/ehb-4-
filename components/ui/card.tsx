import React from 'react';

/**
 * Placeholder Card component. Update with your own design as needed.
 */
export function Card({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      {...props}
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        padding: 16,
        background: '#fff',
        ...props.style,
      }}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div {...props} style={{ marginBottom: 8, ...props.style }}>
      {children}
    </div>
  );
}

export function CardContent({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div {...props} style={{ ...props.style }}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <h3 {...props} style={{ fontWeight: 'bold', fontSize: 18, ...props.style }}>
      {children}
    </h3>
  );
}
