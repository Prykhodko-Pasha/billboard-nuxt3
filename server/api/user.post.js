import { sendError } from "h3";
import { createUser, findUser } from "../db/users";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, name, password } = body;

  if (!email || !name || !password) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid params" })
    );
  }

  const user = await findUser(email);
  if (user) {
    return sendError(
      event,
      createError({ statusCode: 409, statusMessage: "Email in use" })
    );
  }

  const newUser = await createUser(body);

  return { body: newUser };
});
