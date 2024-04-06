import * as z from 'zod';

export const FolderValidation = z.object({
  folderTitle: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(35),
  folderImage: z.string().url(),
  folderDescription: z.string(),
  accountId: z.string(),
});
