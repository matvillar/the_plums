'use client';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import { toCapitalize } from '@/lib/utils';

export default function HomePage() {
  const { user } = useUser();
  const userNameCapitalized = toCapitalize(user?.firstName || '');
  return (
    <div className=" h-full flex flex-1 flex-col items-center justify-center space-y-4">
      <Image
        src="/assets/notesAdd.svg"
        alt="Add Notes"
        width={400}
        height={400}
      />
      <h2 className="text-2xl">Welcome to PlumsApp, {userNameCapitalized}</h2>
      <Button className="font-bold">
        <PlusCircleIcon className="h-6 w-6 mr-2" />
        New Note
      </Button>
    </div>
  );
}
