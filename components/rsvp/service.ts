import { GuestListType } from "./schema";

export const rsvp = async (data: GuestListType) => {
  try {
    const response = await fetch("/.netlify/functions/rsvp", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.ok;
  } catch (error) {
    console.error("Error sending RSVP:", error);
    return false;
  }
};
