import { User } from "firebase/auth";
import { BookingType, BookingEntityType } from "@/components/rsvp/schema";

export const saveBooking = async (user: User, data: BookingType) => {
  const token = await user.getIdToken();
  const response = await fetch("/.netlify/functions/rsvp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.ok;
};

export const getBooking = async (user: User) => {
  const token = await user.getIdToken();
  const response = await fetch("/.netlify/functions/booking", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch booking data.");
  }
  return response.json() as Promise<BookingType>;
};

export const getBookings = async (user: User) => {
  const token = await user.getIdToken();
  const response = await fetch("/.netlify/functions/bookings", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch bookings.");
  }
  return response.json() as Promise<BookingEntityType[]>;
};

export const confirmBooking = async (user: User, bookingRef: string) => {
  const token = await user.getIdToken();
  const response = await fetch(`/.netlify/functions/book`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ confirm: true, bookingRef }),
  });
  return response.ok;
};

export const resetBooking = async (user: User, bookingRef: string) => {
  const token = await user.getIdToken();
  const response = await fetch(`/.netlify/functions/book`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ confirm: false, bookingRef }),
  });
  return response.ok;
};

export const addNotesToBooking = async (
  user: User,
  bookingRef: string,
  notes: string
) => {
  const token = await user.getIdToken();
  const response = await fetch(`/.netlify/functions/manage`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ref: bookingRef, notes }),
  });
  return response.ok;
};
