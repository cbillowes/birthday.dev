import { saveRsvp } from "@/components/rsvp/db";
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
  if (event.body) {
    const user = await auth.verifyIdToken(token);
    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Could not authenticate user." }),
      };
    }
    await saveRsvp(user.uid, JSON.parse(event.body));
    return {
      statusCode: 200,
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing booking data." }),
    };
  }
};

export { handler };
