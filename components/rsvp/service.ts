import { GuestListType } from "./schema";

export const rsvp = async (data: GuestListType) => {
  const response = await fetch("/.netlify/functions/rsvp", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.ok;
};
