

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
    sessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user_sessions"
      }
    ],
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    blockedByAdmin: {
      type: Boolean,
      required: true,
      default: false
    },
    blockedReason: {
      type: String,
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