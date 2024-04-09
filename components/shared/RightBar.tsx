'use client';
import { Calendar } from '@/components/ui/calendar';
import { NoteParams } from '@/constants/NoteParams';
import { fetchRecentNotes } from '@/lib/actions/note.actions';
import Link from 'next/link';

import { useEffect, useState } from 'react';

const RightBar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [recentNotes, setRecentNotes] = useState<NoteParams[]>([]);

  const fetchNotes = async () => {
    try {
      const fetchedNotes = await fetchRecentNotes();
      setRecentNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  console.log('recentNotes', recentNotes);
  return (
    <section className="flex w-fit flex-col justify-between gap-12 overflow-auto border-l border-l-dark-4  bg-light-1 text-dark-2 px-10 pb-6 pt-28 max-xl:hidden ">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />

      <div className="flex flex-col justify-start">
        <h3 className="text-2xl">Recent Notes</h3>
        {recentNotes.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 mt-5">
            {recentNotes.map((note) => (
              <Link href={`/notes/${note.parentFolder}`} key={note._id}>
                <div className="flex max-w-[200px] bg-yellow-200 rounded-lg shadow-lg p-4 cursor-pointer hover:opacity-70 hover:transform hover:translate-y-2 transition-all">
                  <p>Note Created: {`${note.createdAt}`}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className=" h-full flex flex-1 flex-col items-center justify-center space-y-4">
            <h2 className="text-2xl">No notes in this folder</h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default RightBar;
