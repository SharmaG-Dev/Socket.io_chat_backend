import mongoose from "mongoose";

export interface createFriendRequestProps {
  from: mongoose.Schema.Types.ObjectId;
  to: mongoose.Schema.Types.ObjectId;
}

export interface ResponseFriendRequestProps {
  id: mongoose.Schema.Types.ObjectId;
  status: string;
}
