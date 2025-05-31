import { z } from "zod";

export const userSchema = z.object({
  email: z.string({
    message: "Email address is required.",
  }),
  password: z.string({ message: "Password is required." }),
});

export type UserType = z.infer<typeof userSchema>;
