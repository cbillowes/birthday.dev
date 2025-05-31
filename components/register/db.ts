import { auth } from "@/firebase/config";
import { UserType } from "./schema";

export const registerUser = async ({
  email,
  password,
}: UserType) => {
  const userRecord = await auth.createUser({
    email,
    password,
  });
  return userRecord;
};
