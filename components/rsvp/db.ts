import { uuidv7 } from "uuidv7";
import { GuestListType } from "./schema";
import { db } from "@/firebase/config";

export const saveRsvp = async ({ guests, surname }: GuestListType) => {
  const ref = uuidv7();
  return guests.map(async (guest) => {
    const id = uuidv7();
    const guestRef = db.collection("guests").doc(id);
    await guestRef.set({
      id: uuidv7(),
      booking: surname,
      ref,
      ...guest,
      createdAt: new Date(),
    });
    return guestRef.id;
  });
};
