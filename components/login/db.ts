import { auth } from "@/firebase/config";

export const verify = async ({ token }: { token: string }) => {
  try {
    const decodedToken = await auth.verifyIdToken(token);
    console.log("Decoded token:", decodedToken);
    return decodedToken;
  } catch (error) {
    console.error("Invalid token:", error);
    throw error;
  }
};
