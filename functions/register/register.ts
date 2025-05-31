import { registerUser } from "@/components/register/db";
import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
  if (event.body) {
    await registerUser(JSON.parse(event.body));
    return {
      statusCode: 200,
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing registration data." }),
    };
  }
};

export { handler };
