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
      <div className="flex">
        <Link href={`/notes/${id}/new-note`}>
          <Button className="mr-4 hover:text-purple-800">
            <MdNoteAdd size={24} />
          </Button>
        </Link>
        <h1>Notes in Folder</h1>
      </div>

      <div className="flex flex-wrap ">
        <NotesDisplay folderId={id} />
      </div>
    </div>
  );
};

export default NotesInFolder;
