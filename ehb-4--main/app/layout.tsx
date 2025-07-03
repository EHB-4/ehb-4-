import './globals.css';

export const metadata = {
  title: 'EHB Technologies',
  description: 'Global Verified Services',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
