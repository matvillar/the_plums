'use client';
import EditorEdit from '@/components/shared/EditorEdit';
import { useParams } from 'next/navigation';

export default function EditNote({
  folderId,
}: {
  folderId: string | string[] | undefined;
}) {
  const { noteId } = useParams();

  return (
    <>
      <div className="flex flex-col justify-start gap-10">
        <EditorEdit noteId={noteId} />
      </div>
    </>
  );
}
