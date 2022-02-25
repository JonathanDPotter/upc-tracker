import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Iuser from "../interfaces/user";
import User from "../models/user";
import signJWT from "../middleware/signJWT";

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
  let { username, password } = req.body as Iuser;
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

      const result = await newUser.save();
      res.status(201).json(result);
    }
  } catch (error: any) {
    res.json({ error });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
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
    res.status(200).json(result);
  } catch (error: any) {
    res.json(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params._id);
    res.status(200).json(deleted);
  } catch (error: any) {
    res.json(error);
  }
};

const controller = {
  register,
  login,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};

export default controller;
