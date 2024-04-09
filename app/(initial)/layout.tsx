import NavbarInit from '@/app/(initial)/_components/NavbarInit';
import '../globals.css';

const InitialLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <html lang="en">
        <NavbarInit />
        <main className="h-full">{children}</main>
      </html>
    </>
  );
};

export default InitialLayout;
