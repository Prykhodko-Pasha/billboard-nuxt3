import jwt from "jsonwebtoken";

const { jwtAccessSecret, jwtRefreshSecret } = useRuntimeConfig();

export function generateTokens(id) {
  const accessToken = jwt.sign({ id }, jwtAccessSecret, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ id }, jwtRefreshSecret, { expiresIn: "24h" });
  return { accessToken, refreshToken };
}

export function sendRefreshToken(event, token) {
  setCookie(event, "token", token, { httpOnly: true, sameSite: true });
}

export function decodeRefreshToken(token) {
  try {
    return jwt.verify(token, jwtRefreshSecret);
  } catch (error) {
    return null;
  }
}

// export async function doesUserAuth() {
//   try {
//     const refreshToken = useCookie("token").value;
//     console.log("doesUserAuth refreshToken :>> ", refreshToken);
//     return await jwt.verify(refreshToken, jwtRefreshSecret);
//   } catch (error) {
//     return null;
//   }
// }
