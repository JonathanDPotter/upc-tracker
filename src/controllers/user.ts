import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput } from "../schemas/user.schema";
import {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  login,
} from "../services/user.service";

const validateUserHandler = async (_req: Request, res: Response) => {
  try {
    return res.sendStatus(200);
  } catch (error: any) {
    console.log(error.message);
    return res.status(401).send(error.message);
  }
};

const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) => {
  try {
    const user = await createUser(req.body);
    return res.json(omit(user, "password"));
  } catch (error: any) {
    console.log(error.message);
    return res.status(409).send(error.message);
  }
};

const loginHandler = async (req: Request, res: Response) => {
  let { username, password } = req.body;

  try {
    const token = await login(username, password);
    return res.json(token);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const getAllUsersHandler = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    return res.json(users);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const getUserHandler = async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const user = await getUser(_id);
    return res.json(user);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const deleteUserHandler = async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const user = await deleteUser(_id);
    return res.json(`Successfully deleted ${user?.username}`);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const controller = {
  validateUserHandler,
  createUserHandler,
  loginHandler,
  getAllUsersHandler,
  getUserHandler,
  deleteUserHandler,
};

export default controller;
