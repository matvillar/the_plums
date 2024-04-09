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

import { FaPlusCircle } from 'react-icons/fa';
import { IoHomeSharp } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';
import { FaFolderOpen } from 'react-icons/fa6';

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
        <div className="flex w-full flex-col gap-6 px-6">
          <div className="mt-4">
            <Link href="/home">
              <Item onClick={() => {}} label="Home" icon={IoHomeSharp} />
            </Link>
          </div>
          <div className="mt-4">
            <Link href="/home">
              <Item onClick={() => {}} label="Search" icon={FaSearch} />
            </Link>
          </div>
          <div className="mt-4">
            <Link href="/folders">
              <Item onClick={() => {}} label="Folders" icon={FaFolderOpen} />
            </Link>
          </div>
        </div>
        {/* <div className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0" /> */}

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
