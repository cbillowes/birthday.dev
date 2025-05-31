import { z } from "zod";

export const guestSchema = z.object({
  name: z.string().min(2, { message: "Please share a name." }),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, {
    message: "Is this a valid number?",
  }),
  requests: z.string().optional(),
  consentForWhatsApp: z.boolean(),
});

export type GuestType = z.infer<typeof guestSchema>;

export const guestListSchema = z.object({
  bookingName: z
    .string()
    .min(2, { message: "The name and surname the booking will be saved as." }),
  guests: z
    .array(guestSchema)
    .min(1, { message: "At least one guest is required for your booking." }),
});

export type GuestListType = z.infer<typeof guestListSchema>;

export const rsvpSchema = z.object({
  bookingName: z.string(),
  ref: z.string(),
  guests: z.array(guestSchema),
  userId: z.string(),
  createdAt: z.number(),
});

export type RsvpType = z.infer<typeof rsvpSchema>;
