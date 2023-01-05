import { sendError } from "h3";
import isPasswordMatching from "~~/helpers/isPasswordMatching";
import { createToken } from "~~/helpers/tokenOperations";
import { findUser, updateUser } from "../db/users";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  if (!email || !password) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid params" })
    );
  }

  // Is password matching?
  const user = await findUser(email);
  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Email is invalid",
      })
    );
  }
  if (!isPasswordMatching(password, user.password)) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Password is invalid",
      })
    );
  }

  // Create a token
  const { id, ...userData } = user;
  const updateData = { ...userData, token: createToken(id) };
  const loginedUser = await updateUser(id, updateData);

  //   // Add http only cookie
  //   sendToken(event, token);

  return loginedUser;
});
