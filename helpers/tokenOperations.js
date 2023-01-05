import jwt from "jsonwebtoken";

const { jwtSecret } = useRuntimeConfig();

export function createToken(id) {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "24h" });
}

// export const sendToken = (event, token) => {
//   setCookie(event.res, "token", token, { httpOnly: true, sameSite: true });
// };

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
