'use client';
import Editor from '@/components/shared/Editor';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/react/style.css';

export default function NewNoteForm({
  folderId,
}: {
  folderId: string | string[] | undefined;
}) {
  return (
    <>
      <div className="flex flex-col justify-start gap-10">
        <Editor folderId={folderId} />
      </div>
    </>
  );
}
