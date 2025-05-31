import { GuestListType, RsvpType } from "./schema";
import { db } from "@/firebase/config";

export const saveRsvp = async (
  userId: string,
  { guests, bookingName }: RsvpType
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
      createdAt: new Date().getTime(),
    });
};

export const getRsvp = async (userId: string) => {
  const snapshot = await db
    .collection("guests")
    .where("userId", "==", userId)
    .get();
  return snapshot.docs.map((doc) => doc.data() as GuestListType)[0];
};

export const getBookings = async (requesterUserId: string) => {
  const authorized = (
    await db.collection("roles").doc(requesterUserId).get()
  ).data()?.admin;
  if (authorized) {
    const snapshot = await db.collection("guests").get();
    return snapshot.docs
      .map((doc) => doc.data() as RsvpType)
      .sort((a, b) => {
        return a.createdAt - b.createdAt;
      });
  }
  throw new Error("You do not have permission to view bookings.");
};
