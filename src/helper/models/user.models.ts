

import mongoose from 'mongoose'
import { model, Schema } from 'mongoose'



const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    groups: {
        type: []
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    activeHistory: []
}, {
    timestamps: true
})


const UserModel = model('users', schema)

export default UserModel