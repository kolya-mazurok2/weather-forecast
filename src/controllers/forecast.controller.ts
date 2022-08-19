import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/api.error';
import { getCurrentForecastsByCityId } from '../repositories/postgres/forecast.repository';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const { cityId } = req.query;
  if (!cityId) {
    return next(ApiError.badRequest());
  }

  const city = await getCurrentForecastsByCityId(parseInt(cityId as string));
  if (!city) {
    return next(ApiError.notFound());
  }

  res.send({
    data: city,
  });
};
