import { CreatetokenProps } from "../../types/token";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.SECRET_AUTH;
if (!secretKey) {
  throw new Error("Secret key is not defined in the environment variables.");
}

export const CreateToken = (user: CreatetokenProps) => {
  const { _id, username, name, email } = user;
  const payload = { _id, username, name, email };
  const response = jwt.sign(payload, secretKey);
  return response;
};
