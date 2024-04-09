'use client';
import NotesDisplay from '@/components/shared/NotesDisplay';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MdNoteAdd } from 'react-icons/md';

import { useParams } from 'next/navigation';

const NotesInFolder = () => {
  const { id } = useParams();

  return (
    <div>
      <div className="flex head-text items-center gap-5">
        <h2 className="text-2xl">Notes in Folder</h2>
        <Link href={`/notes/${id}/new-note`}>
          <MdNoteAdd size={28} />
        </Link>
      </div>

      <div className="flex flex-col m-5 flex-wrap ">
        <NotesDisplay folderId={id} />
      </div>
    </div>
  );
};

export default NotesInFolder;
