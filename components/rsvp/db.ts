import { uuidv7 } from "uuidv7";
import { GuestListType } from "./schema";
import { db } from "@/firebase/config";

export const saveRsvp = async ({ guests, bookingName }: GuestListType) => {
  const ref = uuidv7();
  await Promise.all(
    guests.map(async (guest) => {
      const id = uuidv7();
      await db
        .collection("guests")
        .doc(id)
        .set({
          id,
          bookingName,
          ref,
          ...guest,
          createdAt: new Date(),
        });
    })
  );
};
