


import { Schema, model } from 'mongoose'


const schema = new Schema({
    sender: {
        type: String,
        required: true
    },
    reciver: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})



export const MessageModel = model("messages", schema)


