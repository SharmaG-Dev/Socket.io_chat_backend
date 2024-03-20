import { extend } from "joi";
import mongoose, { ObjectId } from "mongoose";


export interface CreateUserProps {
    name: string;
    email: string;
    password: string;
    username: string;
    mobile: number;
}

export type SessionRequest = {
    deviceInfo?: string
    ipAddress?: string
    location?: string
    locationLAT: string
    locationLONG?: string
    fcmToken?: string
}

export interface Session {
    userId: string
    deviceInfo: string | undefined | null
    ipAddress: string | undefined | null
    fcmToken: string | undefined | null
    lastActivity: Date | undefined | null
    isExpired: boolean | undefined | null
    location: string | undefined | null
    blockByAdmin: boolean | undefined | null
    blockReason: string | undefined | null
    isActive: boolean | undefined | null
    createdAt: Date | undefined | null
    updatedAt: Date | undefined | null
    deletedAt: Date | undefined | null
    locationLAT: string | undefined | null
    locationLONG: string | undefined | null
}


export interface Payload {
    username: string;
    name: string;
    email: string;
    _id: ObjectId | undefined
}

export interface tokenResponse extends Partial<Payload> {
    token: string
}


export interface mongooseId {
    _id?: ObjectId | undefined
}