import { GuestListType } from "./schema";
import { db } from "@/firebase/config";

export const saveRsvp = async (
  userId: string,
  { guests, bookingName }: GuestListType
) => {
  const ref = userId;
  await db
    .collection("guests")
    .doc(ref)
    .set({
      userId,
      bookingName: bookingName.trim(),
      ref,
      guests: guests.map(({ name, phone, consentForWhatsApp, requests }) => ({
        name: name.trim(),
        phone: phone.trim(),
        consentForWhatsApp,
        requests: requests ? requests.trim() : "",
      })),
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
