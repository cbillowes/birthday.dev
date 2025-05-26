import { saveRsvp } from "@/components/rsvp/db";
import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
  if (event.body) {
    const result = await saveRsvp(JSON.parse(event.body));
    return {
      statusCode: 200,
      body: JSON.stringify({ ref: result }),
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing RSVP data." }),
    };
  }
};

export { handler };
