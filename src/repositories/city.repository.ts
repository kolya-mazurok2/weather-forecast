import { MoreThanOrEqual, Between } from "typeorm";
import { dataSource } from "../config/database";
import { City } from "../entities/city";
import { ForecastType } from "../entities/forecast";

export interface CityPayload {
  name: string;
  latitude: number;
  longitude: number;
}

export type CityUpdatePayload = CityPayload & {
  id: number;
};

export const getCity = async (id: number): Promise<City | null> =>
  dataSource.getRepository(City).findOne({
    where: {
      id: id,
    },
  });

export const getCityForecasts = async (id: number): Promise<City | null> =>
  dataSource.getRepository(City).findOne({
    where: {
      id: id,
      forecasts: {
        type: ForecastType.DAY5_HOUR3,
        for_date: MoreThanOrEqual(new Date()),
      },
    },
    order: {
      forecasts: {
        for_date: "ASC",
      },
    },
    relations: ["forecasts"],
  });

export const getCities = async (): Promise<City[]> =>
  dataSource.getRepository(City).find();