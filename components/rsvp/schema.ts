import { z } from "zod";

export const guestSchema = z.object({
  name: z.string().min(2, { message: "Name and surname is required." }),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, {
    message: "WhatsApp number required. Remember to include your country code.",
  }),
  requests: z.string().optional(),
  consentForWhatsApp: z.boolean(),
  expectedTime: z.string().regex(/^[0-2][0-9]h[0-9][0-9]$/, {
    message: "Enter a time in the format like 16h30.",
  }),
});

export type GuestType = z.infer<typeof guestSchema>;

export const bookingTypeSchema = z.object({
  ref: z.string().optional(),
  guests: z
    .array(guestSchema)
    .min(1, { message: "At least one guest is required for your booking." }),
});

export type BookingType = z.infer<typeof bookingTypeSchema>;

export const bookingEntitySchema = z.object({
  ref: z.string(),
  guests: z.array(guestSchema),
  userId: z.string(),
  createdAt: z.number(),
  createdBy: z.string().optional(),
  modifiedAt: z.number().optional(),
  modifiedBy: z.string().optional(),
  confirmedAt: z.number().optional(),
  confirmedBy: z.string().optional(),
  notes: z.string().optional(),
});

export type BookingEntityType = z.infer<typeof bookingEntitySchema>;
