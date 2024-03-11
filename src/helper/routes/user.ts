import express from 'express'
import { CreateUserValidate } from '../validator/user.validate'
import { RegisterUser } from '../controllers/user.controllers'

const router = express.Router()


router.route("/create").post(CreateUserValidate, RegisterUser)





export default router