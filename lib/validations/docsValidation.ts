import * as z from 'zod';

export const docsValidation = z.object({
  title: z.string(),
  userId: z.string(),
  isArchived: z.boolean(),
  parentDocId: z.optional(z.string()),
  content: z.optional(z.string()),
  coverImage: z.optional(z.string()),
  icon: z.optional(z.string()),
});
