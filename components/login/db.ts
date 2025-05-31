import { auth } from "@/firebase/config";

export const verify = async ({ token }: { token: string }) => {
  try {
    return await auth.verifyIdToken(token);
  } catch (error) {
    console.error("Invalid token:", error);
    throw error;
  }
};
