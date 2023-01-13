import { sendError } from "h3";
import { decodeRefreshToken, generateTokens } from "~~/helpers/tokenOperations";
import { getUser } from "../db/users";

export default defineEventHandler(async (event) => {
  //   const cookies = getRequestHeader(event, "cookie");
  const cookies = parseCookies(event);
  //   console.log("parseCookies typeof cookie.token :>> ", typeof cookie.token);
  //   const refreshToken = cookies.split("token=")[1];
  const refreshToken = cookies.token;
  console.log("refreshToken :>> ", refreshToken);
  if (!refreshToken) {
    console.log("refreshToken is null :>> ", refreshToken);
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Refresh token is invalid",
      })
    );
  } else {
    const { id } = await decodeRefreshToken(refreshToken);
    // console.log("id :>> ", id);

    try {
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
    } catch (error) {
      return sendError(
        event,
        createError({
          statusCode: 500,
          statusMessage: "Something went wrong",
        })
      );
    }
  }
});
