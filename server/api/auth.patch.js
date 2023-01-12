import { setCookie } from "h3";

export default defineEventHandler(async (event) => {
  console.log("logout :>> ");
  setCookie(event, "token", null);
  return null;
});
