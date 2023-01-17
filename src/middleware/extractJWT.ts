import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  console.log("Validating Token");

  let token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).send("unauthorized");

  try {
    const decoded = jwt.verify(token, config.server.token.secret);
    console.log("Valid Token");
    res.locals.jwt = decoded;
    next();
  } catch (error: any) {
    return res.status(401).send(error.message);
  }
};

export default extractJWT;
