import { verify } from "@/components/login/db";
import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
  const authorization = event.headers["authorization"];
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Unauthorized" }),
    };
  }

  const token = authorization.split(" ")[1];
  if (token) {
    const result = await verify({ token });
    if (result) {
      return {
        statusCode: 200,
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Invalid token." }),
      };
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing token." }),
    };
  }
};

export { handler };
