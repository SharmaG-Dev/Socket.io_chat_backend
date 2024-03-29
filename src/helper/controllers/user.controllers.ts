import { Request, Response } from "express";
import {
  errorResponse,
  failedResponse,
  successResponse,
} from "../func/responses.func";
import { CreateUser, GetAllUser, GetSingleUser } from "../func/users.func";
import UserModel from "../models/user.models";
import { createHash } from "crypto";
import { CreateToken } from "../func/token.func";
import { CustomRequest } from "../../types/requests";

export const RegisterUser = async (req: Request, res: Response) => {
  const formdata = req.body;
  try {
    const response = await (CreateUser(formdata));
    if (response.error) return failedResponse(res, response.message);
    successResponse(res, response);
  } catch (error: any) {
    errorResponse(res, error.message);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = createHash("md5").update(password).digest("hex");

    if (user.password !== hashedPassword) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = CreateToken({
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
    });

    res.header("Authorization", token).json({ user, token });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const GetUsers = async (req: Request, res: Response) => {
  try {
    const response = await GetAllUser();
    if (response.error) return failedResponse(res, response.message);
    successResponse(res, response.data);
  } catch (error: any) {
    errorResponse(res, error.message);
  }
};


export const GetSelfuser = async (req: CustomRequest, res: Response) => {
  const user = req.user

  try {
    const _user = await GetSingleUser(user.data._id)
    if (_user.error) return failedResponse(res, _user.message)
    successResponse(res, _user.data)
  } catch (error: any) {
    errorResponse(res, error.message)
  }
}
