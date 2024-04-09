'use client';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { NoteValidation } from '@/lib/validations/noteValidation';
import { z } from 'zod';

import { createNote } from '@/lib/actions/note.actions';
import { Button } from '../ui/button';
import Editor from '@/components/shared/Editor';
import { usePathname, useRouter } from 'next/navigation';
import { NoteEditorProps } from '@/constants/NoteEditorProps';
import { Block } from '@blocknote/core';
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

{
  /*
  const form = useForm<z.infer<typeof NoteValidation>>({
    mode: 'onChange',
    resolver: zodResolver(NoteValidation),
    defaultValues: {
      noteTitle: '',
      noteBody: '',
      parentFolder: '',
      createdAt: new Date(),
    },
  });
<Form {...form}>

<form
  className="flex flex-col justify-start gap-10"
  onSubmit={form.handleSubmit(onSubmit)}
>
  <FormField
    control={form.control}
    name="noteTitle"
    render={({ field }) => (
      <FormItem className="flex w-full flex-col gap-3">
        <FormLabel className="text-base-semibold text-light-2">
          Note Title
        </FormLabel>
        <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
          <Input
            type="text"
            placeholder="Enter Note title"
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  <FormField
    control={form.control}
    name="noteBody"
    render={({ field }) => (
      <FormItem className="flex w-full flex-col gap-3">
        <FormLabel className="text-base-semibold text-light-2">
          Note Body
        </FormLabel>
        <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
          <BlockNoteView
            editor={editorX}
            theme={'light'}
            onChange={() => {
              saveToMongoDb(editorX.document);
            }}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  <Button type="submit" className="bg-primary-500">
    Create Note
  </Button>
</form>
</Form> */
}

// const onSubmit = async (values: z.infer<typeof NoteValidation>) => {
//   console.log(values);
//   const noteBody = await saveToMongoDb(editorX.document);
//   await createNote({
//     noteTitle: values.noteTitle,
//     noteBody: noteBody,
//     parentFolder: values.parentFolder,
//     createdAt: values.createdAt,
//   });

//   router.push('/home');
// };
