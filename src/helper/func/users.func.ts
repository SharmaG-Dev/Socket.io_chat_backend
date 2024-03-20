import { ObjectId } from "mongoose";
import { CreateUserProps, mongooseId } from "../../types/user";
import UserModel from "../models/user.models";
import { createHash } from "crypto";

export const CreateUser = async (formdata: CreateUserProps) => {
  const { name, username, email, password } = formdata;

  try {
    const hashPassword = createHash("md5").update(password).digest("hex");
    const response = await new UserModel({
      name,
      username,
      email,
      password: hashPassword,
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


export const GetSingleUser = async (_id: ObjectId) => {
  if (!_id) return { error: true, message: "provide the user id in params" }
  try {
    const response = await UserModel.findById(_id)
    if (!response) return { error: true, message: "no user found with this id" }
    return { error: false, message: "success", data: response }
  } catch (error: any) {
    return { error: true, message: error.message }
  }
}

export const DeleteUser = async (id: mongooseId) => {
  let _delete = {}
  if (id) {
    _delete = { _id: id }
  }
  try {
    const response = await UserModel.deleteMany(_delete)
    return { error: false, mesage: `success delete ${response.deletedCount} items` }
  } catch (error: any) {
    return { error: true, message: error.message }
  }
}
