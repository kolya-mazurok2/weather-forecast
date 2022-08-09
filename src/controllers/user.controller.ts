import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/api.error";
import { getUserByEmail } from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../utils/constants";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(ApiError.badRequest());
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return next(ApiError.notFound());
  }

  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ email }, JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.send({
      token,
    });
  } else {
    return next(ApiError.badRequest());
  }
};
