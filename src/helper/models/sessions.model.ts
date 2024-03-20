import mongoose from "mongoose";

const userSessionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    deviceInfo: { type: String, maxlength: 100 },
    ipAddress: String,
    fcmToken: String,
    lastActivity: { type: Date, default: Date.now },
    isExpired: { type: Boolean, default: false },
    location: String,
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: Date,
    locationLAT: String,
    locationLONG: String,
}, { timestamps: true });

export const SessionModel = mongoose.model('user_sessions', userSessionSchema);


