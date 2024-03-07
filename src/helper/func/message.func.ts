import { GetUserMessageProps, RegisterMessageProps } from "../../types/message";
import { MessageModel } from "../models/MessageModel";



export const RegisterMessage = async (formdata: RegisterMessageProps) => {
    try {
        const { sender, reciver, message } = formdata
        const response = await new MessageModel({ sender, reciver, message }).save()

        return { error: false, message: 'success', data: response }
    } catch (error: any) {
        return { error: true, message: error.message }
    }
}


export const GetUserMessage = async (data: GetUserMessageProps) => {
    const { senderid, reciverid } = data
    try {
        const response = await MessageModel.aggregate([
            { $match: { $or: [{ sender: senderid, reciver: reciverid }, { sender: reciverid, reciver: senderid }] } }
        ])
        // const response = await MessageModel.find({ sender: senderid, reciver: reciverid })
        return { error: false, message: "success", data: response }
    } catch (error: any) {
        return { error: true, message: error.message }
    }
}