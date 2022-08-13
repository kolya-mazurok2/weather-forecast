import { Request, Response } from 'express';
import ApiError from '../errors/api.error';
import { errorMessages } from '../errors/constants';

const apiErrorMiddleware = (err: Error, req: Request, res: Response) => {
  if (err instanceof ApiError) {
    return res.status(err.status).send({ message: err.message });
  }

  return res.status(500).send({ message: errorMessages[500] });
};

export default apiErrorMiddleware;
