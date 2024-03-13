import {
  ResponseFriendRequestProps,
  createFriendRequestProps,
} from "../../types/friendRequest";
import FriendRequestModel from "../models/friendRequest.model";
import UserModel from "../models/user.models";

export const SendFriendRequest = async (formData: createFriendRequestProps) => {
  const { from, to } = formData;
  try {
    const response = await new FriendRequestModel({ from, to }).save();
    await Promise.all([
      UserModel.findByIdAndUpdate(from, { $push: { sendRequests: to } }),
      UserModel.findByIdAndUpdate(to, { $push: { sendRequests: from } }),
    ]);
    return { error: false, message: "success", data: response };
  } catch (error: any) {
    return { error: true, message: error.message };
  }
};

export const ResponseFriendRequest = async (
  formdata: ResponseFriendRequestProps
) => {
  const { id, status } = formdata;
  try {
    const response = await FriendRequestModel.findByIdAndUpdate(
      id,
      {
        status: status,
      },
      {
        new: true,
      }
    );
    return { error: false, message: "success", data: response };
  } catch (error: any) {
    return { error: true, message: error.message };
  }
};
