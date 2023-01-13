import { deleteCookie } from "h3";

export default defineEventHandler(async (event) => {
  console.log("logout :>> ");
  deleteCookie(event, "token");
  return null;
});
