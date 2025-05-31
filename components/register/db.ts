import { auth } from "@/firebase/config";
import { UserType } from "./schema";

export const registerUser = async ({
  email,
  password,
  name,
  phoneNumber,
}: UserType) => {
  const userRecord = await auth.createUser({
    displayName: name,
    phoneNumber,
    email,
    password,
  });
  return userRecord;
};
