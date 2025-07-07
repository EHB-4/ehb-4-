import { ReactNode } from 'react';

interface MyPageLayoutProps {
  children: ReactNode;
}

export default function MyPageLayout({ children }: MyPageLayoutProps) {
  return <div>{children}</div>;
}
