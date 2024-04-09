'use client';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { fetchUserInfo } from '@/lib/actions/user.actions';
import NewNoteForm from '@/components/forms/NewNoteForm';
import { useParams } from 'next/navigation';

function NewNotePage() {
  const { id } = useParams();

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-10">
      <NewNoteForm folderId={id} />
    </main>
  );
}

export default NewNotePage;
