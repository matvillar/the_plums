import { fetchNoteById, updateNote } from '@/lib/actions/note.actions';
import { Block, BlockNoteEditor, PartialBlock } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/react';
import '@blocknote/react/style.css';
import { use, useEffect, useMemo, useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

async function uploadFile(file: File) {
  const body = new FormData();
  body.append('file', file);

  const ret = await fetch('https://tmpfiles.org/api/v1/upload', {
    method: 'POST',
    body: body,
  });
  return (await ret.json()).data.url.replace(
    'tmpfiles.org/',
    'tmpfiles.org/dl/'
  );
}

async function updateEditorsContentToMongoDB(
  jsonBlocks: Block[],
  noteId: string | string[]
) {
  await updateNote({
    noteId: noteId,
    noteBody: JSON.stringify(jsonBlocks),
  });
}

async function saveToStorage(jsonBlocks: Block[]) {
  // Save contents to local storage. You might want to debounce this or replace
  // with a call to your API / database.
  localStorage.setItem('editorContent', JSON.stringify(jsonBlocks));
}
async function loadFromMongoDB(noteId: string | string[]) {
  const noteRes = await fetchNoteById(noteId);

  const content = noteRes.noteBody
    ? (JSON.parse(noteRes.noteBody) as PartialBlock[])
    : undefined;

  return content;
}

export default function EditorEdit({ noteId }: { noteId: string | string[] }) {
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | 'loading'
  >('loading');

  useEffect(() => {
    loadFromMongoDB(noteId).then((content) => {
      setInitialContent(content);
    });
  }, [noteId]);

  const editor = useMemo(() => {
    if (initialContent === 'loading') {
      return undefined;
    }
    return BlockNoteEditor.create({ initialContent, uploadFile });
  }, [initialContent]);

  if (editor === undefined) {
    return 'Loading content...';
  }

  return (
    <div className="flex flex-col">
      <div className="wrapper border border-gray-300 pt-10">
        <BlockNoteView
          editor={editor}
          theme={'light'}
          onChange={() => {
            saveToStorage(editor.document);
          }}
        />
      </div>
      <Link href="/home">
        <Button
          className="w-full mt-5"
          onClick={() => {
            updateEditorsContentToMongoDB(editor.document, noteId);
            // clear local storage
            localStorage.removeItem('editorContent');
          }}
        >
          Save
        </Button>
      </Link>
    </div>
  );
}
