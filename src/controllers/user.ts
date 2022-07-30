import { Request, Response } from "express";
import bcrypt from "bcrypt";
// interfaces
import Iuser from "../interfaces/user";
import User from "../models/user";
// utils
import signJWT from "../middleware/signJWT";
import config from "../config";

const validateToken = (req: Request, res: Response) => {
  return res.status(200).json({ message: "Token validated, user authorized." });
};

const login = async (req: Request, res: Response) => {
  let { username, password } = req.body as Iuser;

  try {
    const user = await User.findOne({ username });

    if (user) {
      const isAuth = await bcrypt.compare(password, user.password);

      if (isAuth) {
        signJWT(user, (error, token) => {
          if (error) res.json({ message: "Unauthorized" });
          if (token) res.status(200).json({ token });
        });
      } else {
        res.json({ message: "Unauthorized" });
      }
    } else {
      res.json({ message: "User not found." });
    }
  } catch (error: any) {
    res.json({ error });
  }
};

const register = async (req: Request, res: Response) => {
  let { username, password, key } = req.body as Iuser;
  try {
    const exists = await User.findOne({ username }).exec();

    if (exists) {
      return res.json({ message: "Username already in use." });
    } else {
      const hash = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        password: hash,
      });

      const { _id } = await newUser.save();
      res.status(201).json({ _id, username });
    }
  } catch (error: any) {
    res.json({ error });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error: any) {
    res.json(error);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params._id);
    res.status(200).json(User);
  } catch (error: any) {
    res.json(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await User.findByIdAndUpdate(req.params, req.body, {
      new: true,
    });
    if (result) {
      const { _id } = result;
      res.status(200).json({ _id, message: "updated" });
    }
  } catch (error: any) {
    res.json(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params._id);
    if (deleted) {
      const { username } = deleted;
      res.status(200).json({ username, message: "deleted" });
    }
  } catch (error: any) {
    res.json(error);
  }
};

const controller = {
  validateToken,
  register,
  login,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};

export default controller;
