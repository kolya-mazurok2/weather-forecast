import e, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { errorMessages } from "../errors/constants";
import { JWT_SECRET_KEY } from "../utils/constants";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "") || "";

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    next();
  } catch {
    res.status(401).send({
      message: errorMessages[401],
    });
  }
};
