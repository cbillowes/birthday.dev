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

export const verifyUser = async (token: string) => {
  try {
    const response = await fetch("/.netlify/functions/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to verify user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error verifying user:", error);
    throw error;
  }
};
