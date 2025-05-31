import { getBookings } from "@/components/rsvp/db";
import { auth, db } from "@/firebase/config";
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
  try {
    const authorized = (await db.collection("roles").doc(user.uid).get()).data()
      ?.admin;
    if (authorized) {
      const bookings = await getBookings(user.uid);
      return {
        statusCode: 200,
        body: JSON.stringify(bookings),
      };
    } else {
      return {
        statusCode: 403,
        body: JSON.stringify({
          message: "You do not have permission to view bookings.",
        }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to fetch bookings." }),
    };
  }
};

export { handler };
