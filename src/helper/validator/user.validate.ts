import { NextFunction, Request, Response } from "express"
import Joi from "joi"


export const CreateUserValidate = (req: Request, res: Response, next: NextFunction) => {
    const formdata = req.body
    try {
        const validateSchema = Joi.object({
            name: Joi.string().required(),
            username: Joi.string().required(),
            mobile: Joi.number().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        })
        const { error, value } = validateSchema.validate(formdata)
        if (error) return res.status(400).json({ error: true, message: error.details[0].message })

        next()
    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message })
    }
}