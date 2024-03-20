


import { UserSessions } from "../../types/sessions";
import { SessionRequest } from "../../types/user";
import { SessionModel } from "../models/sessions.model";



export const CreateSession = (sessions: SessionRequest, userId: UserSessions) => {
    const { locationLAT, deviceInfo, fcmToken, ipAddress, location, locationLONG } = sessions

    try {

    } catch (error) {

    }
}


