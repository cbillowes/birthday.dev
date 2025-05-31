import { uuidv7 } from "uuidv7";
import { GuestListType } from "./schema";
import { db } from "@/firebase/config";

export const saveRsvp = async (
  userId: string,
  { guests, bookingName }: GuestListType
) => {
  const ref = uuidv7();
  await db.collection("guests").doc(ref).set({
    userId,
    bookingName,
    ref,
    guests,
    createdAt: new Date(),
  });
};

export const getRsvp = async (userId: string) => {
  const snapshot = await db
    .collection("guests")
    .where("userId", "==", userId)
    .get();

  return snapshot.docs.map((doc) => doc.data() as GuestListType)[0];
};
