import { CreateUserProps } from "../../types/user";
import UserModel from "../models/user.models";
import { createHash } from "crypto";

export const CreateUser = async (formdata: CreateUserProps) => {
  const { name, username, mobile, email, password } = formdata;

  try {
    const hashPassword = createHash("md5").update(password).digest("hex");
    const response = await new UserModel({
      name,
      username,
      email,
      password: hashPassword,
      mobile,
    }).save();
    return { error: false, message: "success", data: response };
  } catch (error: any) {
    return { error: true, message: error.message };
  }
};

export const GetAllUser = async () => {
  try {
    const response = await UserModel.find({});
    return { error: false, message: "success", data: response };
  } catch (error: any) {
    return { error: true, message: error.message };
  }
};
