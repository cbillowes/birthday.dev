import { auth, db } from "@/firebase/config";
import { Handler } from "@netlify/functions";
import { confirmBooking, resetBooking } from "@/components/rsvp/db";

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
    const body = JSON.parse(event.body || "") as {
      confirm: boolean;
      bookingRef: string;
    };
    if (body.confirm) {
      await confirmBooking(body.bookingRef, user);
    } else {
      await resetBooking(body.bookingRef, user);
    }
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
