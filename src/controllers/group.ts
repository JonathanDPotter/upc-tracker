import { Request, Response } from "express";
import Group from "../models/group";
import { InewGroup } from "../interfaces/group";

const makeGroup = async (req: Request, res: Response) => {
  try {
    const newGroup = new Group(req.body);
    const result = await newGroup.save();
    res.status(201).json(result);
  } catch (error: any) {
    res.json(error);
  }
};

const controller = { makeGroup };

export default controller;
