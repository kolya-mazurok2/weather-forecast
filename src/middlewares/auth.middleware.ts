import { NextFunction, Request, Response } from 'express';
import { errorMessages } from '../errors/constants';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.get('API-Key');

  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(401).send({
      message: errorMessages[401],
    });
  } else {
    next();
  }
};
