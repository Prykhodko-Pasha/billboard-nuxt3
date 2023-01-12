import { sendError } from "h3";
import { decodeRefreshToken, generateTokens } from "~~/helpers/tokenOperations";
import { getUser } from "../db/users";

export default defineEventHandler(async (event) => {
  const cookies = getRequestHeader(event, "cookie");
  const refreshToken = cookies.split("token=")[1];
  console.log("refreshToken :>> ", refreshToken);
  if (!refreshToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Refresh token is invalid",
      })
    );
  }

  const { id } = await decodeRefreshToken(refreshToken);
  console.log("id :>> ", id);

  const user = await getUser({ id });
  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Not authorized",
      })
    );
  }
  console.log("user :>> ", user);
  const { accessToken } = generateTokens(user);
  return { ...user, accessToken };
});
