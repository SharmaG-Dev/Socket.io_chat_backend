import mongoose, { model, Schema } from "mongoose";

const schema = new Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      enum: ["requested", "accepted", "rejected"],
      default: "requested",
    },
  },
  {
    timestamps: true,
  }
);

const FriendRequestModel = model("friend_requests", schema);

export default FriendRequestModel;
