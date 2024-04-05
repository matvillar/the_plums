'use client';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import { toCapitalize } from '@/lib/utils';
import { createDoc } from '@/lib/actions/doc.actions';
import { z } from 'zod';
import { docsValidation } from '@/lib/validations/docsValidation';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

export default function HomePage() {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const userNameCapitalized = toCapitalize(user?.firstName || '');

  const onSubmit = async (values: z.infer<typeof docsValidation>) => {
    await createDoc({
      title: values.title,
      content: values.content as string,
      userId: user?.id as string,
      parentDocId: values.parentDocId,
      icon: values.icon,
      coverImage: values.coverImage,
      isArchived: values.isArchived,
      path: pathname,
    });
    toast.loading('Creating note...');
    toast.success('Note created successfully');
    toast.error('Error creating note');
    router.push('/home');
  };

  return (
    <div className=" h-full flex flex-1 flex-col items-center justify-center space-y-4">
      <Image
        src="/assets/notesAdd.svg"
        alt="Add Notes"
        width={400}
        height={400}
      />
      <h2 className="text-2xl">Welcome to PlumsApp, {userNameCapitalized}</h2>
      <Link href="/new-note">
        <Button className="font-bold">
          <PlusCircleIcon className="h-6 w-6 mr-2" />
          New Note
        </Button>
      </Link>
    </div>
  );
}
