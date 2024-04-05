import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';

import '../globals.css';

export const metadata = {
  name: 'PlumsApp',
  description: 'A fun way to create Notes.',
};
const inter = Inter({ subsets: ['latin'] });

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClerkProvider>
        <html lang="en">
          <body className={`${inter.className}`}>{children}</body>
        </html>
      </ClerkProvider>
    </>
  );
}
