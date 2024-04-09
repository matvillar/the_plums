'use client';
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
