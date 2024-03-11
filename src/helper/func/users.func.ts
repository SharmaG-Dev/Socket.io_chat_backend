import { CreateUserProps } from "../../types/user";
import UserModel from "../models/user.models";
import crypto from 'crypto'



export const CreateUser = async (formdata: CreateUserProps) => {
    const { name, username, mobile, email, password } = formdata;

    try {
        const hashPassword = Crypto.bind()
        const response = await new UserModel({
            name,
            username,
            email,
            password,
            mobile
        }).save()
        return { error: false, message: "success", data: response }
    } catch (error: any) {
        return { error: true, message: error.message }
    }
}