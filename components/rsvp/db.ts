import { uuidv7 } from "uuidv7";
import { GuestListType } from "./schema";
import { db } from "@/firebase/config";

export const saveRsvp = async ({ guests, surname }: GuestListType) => {
  const ref = uuidv7();
  console.log("Saving RSVP for ", surname, " with reference:", ref);
  return guests.map(async (guest) => {
    console.log("Saving guest:", guest, "with surname:", surname);
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
