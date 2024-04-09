'use client';
import { NotesDesignParams } from '@/constants/NotesDesignParams';
import { fetchNotesByFolderId } from '@/lib/actions/note.actions';
import { useEffect, useState } from 'react';
import { FolderId } from './FolderId';
import { NoteParams } from '@/constants/NoteParams';
import { useParams } from 'next/navigation';
import { Button } from '../ui/button';
import Link from 'next/link';
import { MdModeEdit } from 'react-icons/md';
import Image from 'next/image';
import { PlusCircleIcon } from 'lucide-react';
const NotesDisplay = ({ folderId }: FolderId) => {
  const { id } = useParams();

  const [notes, setNotes] = useState<NoteParams[]>([]);

  const fetchNotes = async () => {
    try {
      const fetchedNotes = await fetchNotesByFolderId(folderId);
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [folderId]);

  return (
    <div>
      {notes.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5">
          {notes.map((note) => (
            <Link href={`/notes/${id}/${note._id}/edit`} key={note._id}>
              <div className="flex bg-yellow-200 rounded-lg shadow-lg p-4 cursor-pointer hover:opacity-70 hover:transform hover:translate-y-2 transition-all">
                <p>Note Created: {`${note.createdAt}`}</p>
                <MdModeEdit className="text-gray-500 ml-4" size={34} />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className=" h-full flex flex-1 flex-col items-center justify-center space-y-4">
          <Image
            src="/assets/left-note.svg"
            alt="Add Notes"
            width={400}
            height={400}
          />
          <h2 className="text-2xl">No notes in this folder</h2>

          <Link href={`/notes/${id}/new-note`}>
            <Button className="font-bold">
              <PlusCircleIcon className="h-6 w-6 mr-2" />
              New note
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NotesDisplay;
