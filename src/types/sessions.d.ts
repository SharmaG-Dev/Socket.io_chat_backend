
import { SessionModel } from "../helper/models/sessions.model";


export interface UserSessions extends Partial<typeof SessionModel> {
    userId: string
}