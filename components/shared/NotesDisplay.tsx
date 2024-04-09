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
        <div className="Flex flex-col">
          <p>No notes in this folder</p>
          <Link href={`/notes/${id}/new-note`}>
            <Button> Create Note </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NotesDisplay;
