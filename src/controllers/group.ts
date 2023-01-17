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

const creategroupHandler = async (
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

const getAllgroupsHandler = async (_req: Request, res: Response) => {
  try {
    const groups = await getAllGroups();
    return res.json(groups);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const getgroupHandler = async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const group = await getGroup(_id);
    return res.json(group);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const getUsergroupsHandler = async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const groups = await getUserGroups(_id);
    return res.json(groups);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const updategroupHandler = async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const group = await updateGroup(_id, req.body);
    return res.json(group);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const deletegroupHandler = async (req: Request, res: Response) => {
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
  creategroupHandler,
  getAllgroupsHandler,
  getgroupHandler,
  getUsergroupsHandler,
  updategroupHandler,
  deletegroupHandler,
};

export default controller;
