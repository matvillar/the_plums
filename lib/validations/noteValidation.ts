import * as z from 'zod';

export const NoteValidation = z.object({
  noteBody: z.string().optional(),
  parentFolder: z.string().nonempty('Parent folder is required'),
  createdAt: z.date().optional(),
});
