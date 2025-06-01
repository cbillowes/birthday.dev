import { BookingType, BookingEntityType } from "@/components/rsvp/schema";
import { db } from "@/firebase/config";
import { DecodedIdToken } from "firebase-admin/auth";

export const saveBooking = async (
  { guests }: BookingType,
  user: DecodedIdToken
) => {
  const ref = user.uid;
  const booking = (await getBooking(ref)) || {
    createdBy: user.email || user.uid,
    createdAt: new Date().getTime(),
  };
  await db
    .collection("guests")
    .doc(ref)
    .set({
      ...booking,
      userId: user.uid,
      ref,
      bookingName: guests[0].name.trim(),
      confirmedAt: null,
      guests: guests.map(
        ({ name, phone, consentForWhatsApp, requests, expectedTime }) => ({
          name: name.trim(),
          phone: phone.trim(),
          consentForWhatsApp,
          requests: requests ? requests.trim() : "",
          expectedTime,
          confirmed: false,
        })
      ),
      modifiedAt: new Date().getTime(),
      modifiedBy: user.email || user.uid,
    });
};

export const getBooking = async (userId: string) => {
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

export const confirmBooking = async (
  bookingRef: string,
  user: DecodedIdToken
) => {
  const booking = await getBooking(bookingRef);
  await db
    .collection("guests")
    .doc(bookingRef)
    .set({
      ...booking,
      confirmedAt: new Date().getTime(),
      confirmedBy: user.email || user.uid,
      modifiedAt: new Date().getTime(),
      modifiedBy: user.email || user.uid,
    });
};

export const resetBooking = async (
  bookingRef: string,
  user: DecodedIdToken
) => {
  const booking = await getBooking(bookingRef);
  await db
    .collection("guests")
    .doc(bookingRef)
    .set({
      ...booking,
      confirmedAt: null,
      confirmedBy: null,
      modifiedAt: new Date().getTime(),
      modifiedBy: user.email || user.uid,
    });
};

export const saveNotes = async (
  bookingRef: string,
  notes: string,
  user: DecodedIdToken
) => {
  const booking = await getBooking(bookingRef);
  await db
    .collection("guests")
    .doc(bookingRef)
    .set({
      ...booking,
      notes: notes.trim(),
      modifiedAt: new Date().getTime(),
      modifiedBy: user.email || user.uid,
    });
};
