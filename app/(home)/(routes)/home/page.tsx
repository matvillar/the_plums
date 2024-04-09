import { currentUser, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import { toCapitalize } from '@/lib/utils';
import Link from 'next/link';
import { fetchRecentFolders } from '@/lib/actions/folder.actions';
import HomePageData from './_components/HomePageData';
import { fetchUserInfo } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUserInfo(user.id);
  if (!userInfo?.isOnboard) {
    redirect('/get-onboard');
  }

  const userNameCapitalized = toCapitalize(user?.firstName || '');
  const res = await fetchRecentFolders();

  return (
    <>
      <main className="flex flex-col m-5">
        {res.length > 0 ? (
          <HomePageData />
        ) : (
          <div className=" h-full flex flex-1 flex-col items-center justify-center space-y-4">
            <Image
              src="/assets/notesAdd.svg"
              alt="Add Notes"
              width={400}
              height={400}
            />
            <h2 className="text-2xl">
              Welcome to PlumsApp, {userNameCapitalized}
            </h2>
            <Link href="/new-folder">
              <Button className="font-bold">
                <PlusCircleIcon className="h-6 w-6 mr-2" />
                New Folder
              </Button>
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
