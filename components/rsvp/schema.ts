import { z } from 'zod';

export const guestSchema = z.object({
  name: z.string().min(2, { message: 'Please share a name.' }),
  email: z.string().optional(),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, {
    message: 'Is this a valid number?'
  }),
  requests: z.string().optional()
});

export type GuestType = z.infer<typeof guestSchema>;

export const guestListSchema = z.object({
  surname: z.string().min(2, { message: 'Surname the booking will be saved under.' }),
  guests: z.array(guestSchema).min(1, { message: 'At least one guest is required' })
});

export type GuestListType = z.infer<typeof guestListSchema>;