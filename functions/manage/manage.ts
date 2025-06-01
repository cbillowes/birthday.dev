import { auth, db } from "@/firebase/config";
import { Handler } from "@netlify/functions";
import { manageBooking } from "@/components/rsvp/db";
import { BookingEntityType } from "@/components/rsvp/schema";

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
  const authorized = (await db.collection("roles").doc(user.uid).get()).data()
    ?.admin;
  if (authorized) {
    const booking = JSON.parse(event.body || "") as BookingEntityType;
    await manageBooking(booking, user);
    return {
      statusCode: 200,
    };
  } else {
    return {
      statusCode: 403,
      body: JSON.stringify({
        message: "You do not have permission to manage bookings.",
      }),
    };
  }
};

export { handler };
