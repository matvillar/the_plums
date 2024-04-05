'use client';
import { UserButton, useUser } from '@clerk/nextjs';
import { OrganizationSwitcher, SignOutButton, SignedIn } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { toCapitalize } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import ProfileDropDownMenu from './ProfileDropDownMenu';

const TopBar = () => {
  const router = useRouter();
  const { user } = useUser();
  const userNameCapitalized = toCapitalize(user?.firstName || '');
  return (
    <section className="flex text-center p-10">
      <div className="hidden md:flex items-center gap-4">
        <p className="text-4xl font-bold">My Notes</p>
      </div>
      <div className="flex items-center justify-end ml-auto gap">
        <div className="flex">
          <p className="mr-2">Hi {userNameCapitalized}!</p>
        </div>
        <ProfileDropDownMenu />
      </div>
    </section>
  );
};

export default TopBar;
