import Jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

import { NextFunction, Response } from "express";
import { tokenResponse } from "../../types/user";
import { GetSingleUser } from "../func/users.func";
import { ObjectId } from "mongoose";
import { CustomRequest } from "../../types/requests";



export const Authorization = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const _token = req.headers.authorization?.split(" ")[1]
  if (!_token) return res.status(401).json({ error: true, message: "token not provided" })
  try {
    Jwt.verify(_token, (process.env.SECRET_AUTH) as string, async function (error, decode) {
      if (error) return res.status(401).json({ error: true, message: error.message })
      const { _id, name, username, email } = decode as Partial<tokenResponse>

      const _user = await GetSingleUser((_id) as ObjectId)
      if (!_user) return res.status(400).json({ error: true, message: "no user found" })
      req.user = _user
      next()
    })

  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message })
  }
};
