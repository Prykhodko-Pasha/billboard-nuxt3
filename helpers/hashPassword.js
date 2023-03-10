import bcrypt from "bcryptjs";

export default function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
