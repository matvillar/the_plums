import Link from 'next/link';
import Logo from '../../../components/shared/Logo';
import { FaSignInAlt } from 'react-icons/fa';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs';
import { AiFillHome } from 'react-icons/ai';

const NavbarInit = async () => {
  const user = await currentUser();
  return (
    <div className="bg-background flex fixed top-0 items-center w-full p-6">
      <Logo />

      {user ? (
        <Link
          href="/home"
          className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2"
        >
          <AiFillHome />
          Home
        </Link>
      ) : (
        <Link
          href="/sign-in"
          className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2"
        >
          <FaSignInAlt />
          Log In
        </Link>
      )}
    </div>
  );
};

export default NavbarInit;
