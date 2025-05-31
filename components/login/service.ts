import {
  auth,
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "@/firebase/client";
import { UserType } from "./schema";

export const loginUser = async ({ email, password }: UserType) => {
  const record = await signInWithEmailAndPassword(auth, email, password);
  await setPersistence(auth, browserLocalPersistence);
  if (!record) {
    throw new Error("Login failed. Please check your credentials.");
  }
  return true;
};
