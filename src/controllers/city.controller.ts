import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/api.error';
import { getCities, getCity, getCityForecasts } from '../repositories/city.repository';
import { ForecastType } from '../entities/forecast';

export const getAll = async (_: Request, res: Response) => {
  const cities = await getCities();

  res.send({
    data: cities,
  });
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!id) {
    return next(ApiError.badRequest());
  }

  const city = await getCity(parseInt(id));

  if (!city) {
    return next(ApiError.notFound());
  }

  res.send({
    data: city,
  });
};

export const getForecasts = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!id) {
    return next(ApiError.badRequest());
  }

  const { type } = req.query;

  const forecast =
    type && (<any>Object).values(ForecastType).includes(type)
      ? await getCityForecasts(parseInt(id), type as ForecastType)
      : await getCityForecasts(parseInt(id));

  if (!forecast) {
    return next(ApiError.notFound());
  }

  res.send({
    data: forecast,
  });
};
