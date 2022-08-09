import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/api.error";
import {
  getCities,
  getCity,
  getCityForecasts,
} from "../repositories/city.repository";

interface RequestParams {
  id: number;
}

export default class CityController {
  public async getAll(_: Request, res: Response): Promise<void> {
    const cities = await getCities();

    res.send({
      data: cities,
    });
  }

  public async get(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
  }

  public async getForecasts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    if (!id) {
      return next(ApiError.badRequest());
    }

    const forecast = await getCityForecasts(parseInt(id));

    if (!forecast) {
      next(ApiError.notFound());
    }
    res.send({
      data: forecast,
    });
  }
}
