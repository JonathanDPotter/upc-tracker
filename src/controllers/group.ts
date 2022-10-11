import { Request, Response } from "express";
import Group from "../models/group";

const makeGroup = async (req: Request, res: Response) => {
  try {
    const newGroup = new Group(req.body);
    const result = await newGroup.save();
    res.status(201).json(result);
  } catch (error: any) {
    res.json(error);
  }
};

const getGroups = async (req: Request, res: Response) => {
  try {
    const groups = await Group.find({user: req.params.user});
    res.status(200).json(groups);
  } catch (error: any) {
    res.json(error);
  }
};

const getGroup = async (req: Request, res: Response) => {
  try {
    const group = await Group.findById(req.params._id);
    res.status(200).json(group);
  } catch (error: any) {
    res.json(error);
  }
};

const updateGroup = async (req: Request, res: Response) => {
  try {
    const result = await Group.findByIdAndUpdate(req.params, req.body, {
      new: true,
    });
    res.status(200).json(result);
  } catch (error: any) {
    res.json(error);
  }
};

const deleteGroup = async (req: Request, res: Response) => {
  try {
    const deleted = await Group.findByIdAndDelete(req.params._id);
    res.status(200).json(deleted);
  } catch (error: any) {
    res.json(error);
  }
};

const controller = { makeGroup, getGroups, getGroup, updateGroup, deleteGroup };

export default controller;
