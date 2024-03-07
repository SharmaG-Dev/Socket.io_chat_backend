import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const MongoUrl: string = (process.env.MONGOURL) as string


export const connectTodb = () => mongoose.connect(MongoUrl).then(() => {
    console.log("server connected to database")
}).catch((error) => {
    console.log(error)
})


