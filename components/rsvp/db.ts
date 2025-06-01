import { BookingType, BookingEntityType } from "@/components/rsvp/schema";
import { db, stripUndefined } from "@/firebase/config";
import { DecodedIdToken } from "firebase-admin/auth";

export const saveBooking = async (
  { ref, guests }: BookingType,
  user: DecodedIdToken
) => {
  const bookingRef = ref || user.uid;
  const booking = (await getBooking(bookingRef)) || {
    createdBy: user.email || user.uid,
    createdAt: new Date().getTime(),
  };
  await db
    .collection("guests")
    .doc(bookingRef)
    .set({
      ...booking,
      userId: user.uid,
      ref: bookingRef,
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
    .where("ref", "==", userId)
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

export const getBookingByRef = async (
  requesterUserId: string,
  bookingRef: string
) => {
  const authorized = (
    await db.collection("roles").doc(requesterUserId).get()
  ).data()?.admin;
  if (authorized) {
    const snapshot = await db
      .collection("guests")
      .where("ref", "==", bookingRef)
      .get();
    return snapshot.docs.map((doc) => doc.data() as BookingEntityType)[0];
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

export const manageBooking = async (
  booking: BookingEntityType,
  user: DecodedIdToken
) => {
  const updatedBooking = stripUndefined({
    ...booking,
    modifiedAt: new Date().getTime(),
    modifiedBy: user.email || user.uid,
  });
  await db
    .collection("guests")
    .doc(booking.ref)
    .set(updatedBooking, { merge: true });
};
