import { Request, Response } from "express"
import { errorResponse, failedResponse } from "../func/responses.func"
import { CreateUser } from "../func/users.func"
import UserModel from "../models/user.models"




export const RegisterUser = async (req: Request, res: Response) => {
    const formdata = req.body
    try {
        const response = await CreateUser(formdata)
        if (response.error) return failedResponse(res, response.message)
    } catch (error: any) {
        errorResponse(res, error.message)
    }
}


export const LoginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const response = await UserModel.find({ username })
        if (!response) return failedResponse(res, "user not found")



    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message })
    }
}

