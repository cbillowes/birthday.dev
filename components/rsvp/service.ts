import { User } from "firebase/auth";
import { GuestListType } from "./schema";

export const saveRsvp = async (token: string, data: GuestListType) => {
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

export const getRsvp = async (user: User) => {
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
  return response.json() as Promise<GuestListType>;
};
