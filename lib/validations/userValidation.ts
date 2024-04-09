import * as z from 'zod';

export const userValidation = z.object({
  profileImg: z.string().url().nonempty(),
  username: z.string().min(3).max(20),
  name: z.string().min(3).max(20),
});
