import './globals.css'
import { Providers } from "./providers/SessionProvider"

export const metadata = {
  title: 'EHB Technologies',
  description: 'Global Verified Services',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 