import { uuidv7 } from "uuidv7";
import { GuestListType } from "./schema";
import { db } from "@/firebase/config";

export const saveRsvp = async ({ guests, surname }: GuestListType) => {
  const ref = uuidv7();
  guests.map(async (guest) => {
    const guestRef = db.collection("guests").doc();
    return await guestRef.set({
      id: uuidv7(),
      booking: surname,
      ref,
      ...guest,
      createdAt: new Date(),
    });
  });
};
