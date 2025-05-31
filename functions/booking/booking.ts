import { getRsvp } from "@/components/rsvp/db";
import { auth } from "@/firebase/config";
import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
  const token = event.headers.authorization?.split(" ")[1];
  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Unauthorized." }),
    };
  }
  const user = await auth.verifyIdToken(token);
  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Could not authenticate user." }),
    };
  }
  const booking = await getRsvp(user.uid);
  return {
    statusCode: 200,
    body: JSON.stringify(booking),
  };
};

export { handler };
