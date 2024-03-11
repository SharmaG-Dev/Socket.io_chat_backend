import { Response } from "express";




export const successResponse = (res: Response, data: any) => {
    return res.status(200).json({ error: false, message: 'success', data: data })
}

export const failedResponse = (res: Response, message: string) => {
    return res.status(400).json({ error: true, message: message })
}

export const errorResponse = (res: Response, message: string) => {
    return res.status(500).json({ error: true, message: message })
}