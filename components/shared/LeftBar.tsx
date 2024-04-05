'use client';
import { sidebarLinks } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { SignOutButton, SignedIn } from '@clerk/clerk-react';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { ChevronsLeft, MenuIcon } from 'lucide-react';
import Logo from './Logo';
import { ElementRef, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import MenuItems from './MenuItems';
import { CiCirclePlus } from 'react-icons/ci';
import Item from './Item';

const LeftBar = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const router = useRouter();
  const pathName = usePathname();

  return (
    <>
      <section className="hidden md:block h-full group/sidebar bg-secondary overflow-y-auto relative w-60 flex-col z-[99999]">
        <Logo />
        <div className="h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-400 absolute top-3 right-3 opacity-0 group-hover/sidebar:opacity-100 transition">
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div className="flex w-full flex-1 flex-col gap-6 px-6">
          {/* <MenuItems /> */}
          {/* {sidebarLinks.map((link) => {
            const isActive =
              (pathName.includes(link.route) && link.route.length > 1) ||
              pathName === link.route;

            return (
              <Link
                href={link.route}
                key={link.label}
                className={`relative flex justify-start gap-4 rounded-lg p-4 ${isActive && 'bg-dark'}`}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />
                <p className="max-lg:hidden text-light-1">{link.label}</p>
              </Link>
            );
          })} */}
        </div>
        <div className="mt-4">
          <Link href="/new-note">
            <Item onClick={() => {}} label="New Page" icon={CiCirclePlus} />
          </Link>
        </div>
        <div className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0" />

        <div className="mt-10 px-6 py-6">
          <SignedIn>
            <SignOutButton signOutCallback={() => router.push('/')}>
              <div className="flex cursor-pointer items-center">
                <RiLogoutBoxLine className="m-4" size={28} />{' '}
                <p className="max-lg:hidden">Log Out</p>
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
      </section>
    </>
  );
};

export default LeftBar;
