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
