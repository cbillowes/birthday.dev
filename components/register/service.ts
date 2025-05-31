import { UserType } from "./schema";

export const registerUser = async (data: UserType) => {
  return await fetch("/.netlify/functions/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
