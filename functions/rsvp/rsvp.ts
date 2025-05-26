import { saveRsvp } from "@/components/rsvp/db";
import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
  if (event.body) {
    await saveRsvp(JSON.parse(event.body));
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing RSVP data." }),
    };
  }
  return {
    statusCode: 200,
  };
};

export { handler };
