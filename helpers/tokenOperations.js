import jwt from "jsonwebtoken";

const { jwtAccessSecret, jwtRefreshSecret } = useRuntimeConfig();

// export function createToken(id) {
//   return jwt.sign({ id }, jwtSecret, { expiresIn: "24h" });
// }
export function generateTokens(id) {
  const accessToken = jwt.sign({ id }, jwtAccessSecret, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ id }, jwtRefreshSecret, { expiresIn: "24h" });
  return { accessToken, refreshToken };
}

export const sendRefreshToken = (event, token) => {
  setCookie(event, "token", token, { httpOnly: true, sameSite: true });
};

// export async function verifyToken(req) {
//   try {
//     const { authorization } = req.headers;
//     // console.log("authorization :>> ", authorization);
//     const [bearer, token] = authorization?.split(" ");
//     const { id } = jwt.verify(token, jwtSecret);
//     const user = await getUser({ id });

//     if (!authorization || bearer !== "Bearer" || !user) throw new Error();

//     return user;
//   } catch (error) {
//     error.user = 401;
//     error.message = "Not authorized";
//     return error;
//   }
// }
