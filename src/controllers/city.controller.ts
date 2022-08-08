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
    req: Request<RequestParams, any, any, any>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const city = await getCity(id);

    if (!city) {
      next(ApiError.notFound());
    }

    res.send({
      data: city,
    });
  }

  public async getForecasts(
    req: Request<RequestParams, any, any, any>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const forecast = await getCityForecasts(id);

    if (!forecast) {
      next(ApiError.notFound());
    }
    res.send({
      data: forecast,
    });
  }
}
