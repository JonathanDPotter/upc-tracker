import GroupModel, { GroupInput } from "../models/group.model";
import UserModel from "../models/user.model";

export const createGroup = async (input: GroupInput) => {
  try {
    const group = await GroupModel.create(input);
    return group;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllGroups = async () => {
  try {
    const groups = await GroupModel.find();
    return groups;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getGroup = async (_id: string) => {
  try {
    const group = await GroupModel.findById(_id);
    return group;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserGroups = async (_id: string) => {
  try {
    const groups = await GroupModel.find({ user: _id });
    return groups;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateGroup = async (_id: string, update: GroupInput) => {
  try {
    const group = await GroupModel.findByIdAndUpdate(_id, update);
    return group;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteGroup = async (_id: string) => {
  try {
    const group = await GroupModel.findByIdAndDelete(_id);
    return group;
  } catch (error: any) {
    throw new Error(error);
  }
};
