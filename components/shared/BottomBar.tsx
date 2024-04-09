'use client';

import { sidebarLinks } from '@/constants';
import { usePathname, useRouter } from 'next/navigation';
import { FaPlusCircle } from 'react-icons/fa';
import { IoHomeSharp } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';
import { FaFolderOpen } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import Item from './Item';
const BottomBar = () => {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <section className="fixed bottom-0 z-10 w-full rounded-t-3xl bg-secondary p-5 backdrop-blur-lg xs:px-7 md:hidden">
      <div className="flex items-center justify-between gap-3 xs:gap-5">
        <div className="mt-4">
          <Link href="/home">
            <Item onClick={() => {}} label="Home" icon={IoHomeSharp} />
          </Link>
        </div>
        <div className="mt-4">
          <Link href="/profile">
            <Item onClick={() => {}} label="Profile" icon={FaUser} />
          </Link>
        </div>
        <div className="mt-4">
          <Link href="/folders">
            <Item onClick={() => {}} label="Folders" icon={FaFolderOpen} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BottomBar;
