import { NoteEditorProps } from '@/constants/NoteEditorProps';
import { createNote } from '@/lib/actions/note.actions';
import { Block, BlockNoteEditor, PartialBlock } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import {
  BlockNoteView,
  BlockTypeSelect,
  FormattingToolbar,
  FormattingToolbarController,
  ImageCaptionButton,
  ReplaceImageButton,
  useCreateBlockNote,
} from '@blocknote/react';
import '@blocknote/react/style.css';
import { use, useEffect, useMemo, useState } from 'react';
import { Button } from '../ui/button';

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

async function saveEditorsContentToMongoDB(
  jsonBlocks: Block[],
  folderId: string | string[] | undefined
) {
  await createNote({
    _id: '',
    noteBody: JSON.stringify(jsonBlocks),
    parentFolder: folderId,
    createdAt: new Date(),
  });
}

async function saveToStorage(jsonBlocks: Block[]) {
  // Save contents to local storage. You might want to debounce this or replace
  // with a call to your API / database.
  localStorage.setItem('editorContent', JSON.stringify(jsonBlocks));
}

async function loadFromStorage() {
  // Gets the previously stored editor contents.
  const storageString = localStorage.getItem('editorContent');
  return storageString
    ? (JSON.parse(storageString) as PartialBlock[])
    : undefined;
}

export default function Editor({
  folderId,
}: {
  folderId: string | string[] | undefined;
}) {
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | 'loading'
  >('loading');

  useEffect(() => {
    loadFromStorage().then((content) => {
      setInitialContent(content);
    });
  }, [folderId]);

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
    <div className="wrapper border border-gray-300">
      <BlockNoteView
        editor={editor}
        theme={'light'}
        onChange={() => {
          saveToStorage(editor.document);
        }}
      />
      {/* Save on click to Mongodb */}
      <Button
        onClick={() => {
          saveEditorsContentToMongoDB(editor.document, folderId);
          // clear local storage
          localStorage.removeItem('editorContent');
        }}
      >
        Save
      </Button>
    </div>
  );
}

// const editor: BlockNoteEditor = useCreateBlockNote({
//   initialContent: [
//     {
//       type: 'paragraph',
//       content: 'Welcome to this demo!',
//     },
//     {
//       type: 'paragraph',
//       content: 'Upload an image using the button below',
//     },
//     {
//       type: 'image',
//     },
//   ],
//   uploadFile,
// });

// async function getEditorsContentFromMongoDB(
//   folderId: string | string[] | undefined
// ) {
//   const content = await getNotesByFolderId(folderId);
//   return content ? (JSON.parse(content) as PartialBlock[]) : undefined;
// }
