import { Request, Response } from "express";
import { CreateGroupInput } from "../schemas/group.schema";
import {
  createGroup,
  getAllGroups,
  getGroup,
  deleteGroup,
  updateGroup,
  getUserGroups,
} from "../services/group.service";

const createGroupHandler = async (
  req: Request<{}, {}, CreateGroupInput["body"]>,
  res: Response
) => {
  try {
    const group = await createGroup(req.body);
    return res.json(group);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const getAllGroupsHandler = async (_req: Request, res: Response) => {
  try {
    const groups = await getAllGroups();
    return res.json(groups);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const getGroupHandler = async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const group = await getGroup(_id);
    return res.json(group);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const getUserGroupsHandler = async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const groups = await getUserGroups(_id);
    return res.json(groups);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const updateGroupHandler = async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const group = await updateGroup(_id, req.body);
    return res.json(group);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const deleteGroupHandler = async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const group = await deleteGroup(_id);
    return res.json(`Successfully deleted ${group?.title}`);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const controller = {
  createGroupHandler,
  getAllGroupsHandler,
  getGroupHandler,
  getUserGroupsHandler,
  updateGroupHandler,
  deleteGroupHandler,
};

export default controller;
