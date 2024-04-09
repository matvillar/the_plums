import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import '../globals.css';
import TopBar from '@/components/shared/TopBar';
import LeftBar from '@/components/shared/LeftBar';
import RightBar from '@/components/shared/RightBar';
import BottomBar from '@/components/shared/BottomBar';

export const metadata = {
  name: 'PlumsApp',
  description: 'A fun way to create Notes.',
};
const inter = Inter({ subsets: ['latin'] });

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClerkProvider>
        <Toaster position="bottom-center" />
        <html lang="en">
          <body className={inter.className}>
            <main className="h-full flex flex-row">
              <LeftBar />
              <div className="flex flex-col w-full">
                <TopBar />
                <div className="flex">
                  <section className="flex h-full flex-1 flex-col items-center bg-light-1 px-6 pb-10 mt-10 max-md:pb-32 sm:px-10">
                    <div className="w-full max-w-4xl">{children}</div>
                  </section>
                  <RightBar />
                </div>
              </div>
            </main>
            <BottomBar />
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
