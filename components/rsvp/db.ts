import { BookingType, BookingEntityType } from "@/components/rsvp/schema";
import { db } from "@/firebase/config";

export const saveBooking = async (userId: string, { guests }: BookingType) => {
  const ref = userId;
  const booking = (await getRsvp(userId)) || {
    createdAt: new Date().getTime(),
  };
  await db
    .collection("guests")
    .doc(ref)
    .set({
      ...booking,
      userId,
      bookingName: guests[0].name.trim(),
      ref,
      guests: guests.map(
        ({ name, phone, consentForWhatsApp, requests, expectedTime }) => ({
          name: name.trim(),
          phone: phone.trim(),
          consentForWhatsApp,
          requests: requests ? requests.trim() : "",
          expectedTime,
        })
      ),
      modifiedAt: new Date().getTime(),
    });
};

export const getRsvp = async (userId: string) => {
  const snapshot = await db
    .collection("guests")
    .where("userId", "==", userId)
    .get();
  return snapshot.docs.map((doc) => doc.data() as BookingType)[0];
};

export const getBookings = async (requesterUserId: string) => {
  const authorized = (
    await db.collection("roles").doc(requesterUserId).get()
  ).data()?.admin;
  if (authorized) {
    const snapshot = await db.collection("guests").get();
    return snapshot.docs
      .map((doc) => doc.data() as BookingEntityType)
      .sort((a, b) => {
        return a.createdAt - b.createdAt;
      });
  }
  throw new Error("You do not have permission to view bookings.");
};
