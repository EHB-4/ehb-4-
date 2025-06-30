export const metadata = {
  title: 'GoSellr - Product Listing',
  description: 'Verified global products',
};

export default function GoSellrLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
