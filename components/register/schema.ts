import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string(),
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //   {
  //     message: "Please enter a valid password.",
  //   }
  // ),
  acceptedTerms: z.boolean().refine((val) => val, {
    message: "You must read and agree to the privacy policy.",
  }),
});

export type UserType = z.infer<typeof userSchema>;
