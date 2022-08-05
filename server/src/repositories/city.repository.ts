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

export const getCity = async (id: number): Promise<City | null> => {
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date();
  end.setUTCHours(23, 59, 59, 999);

  return dataSource.getRepository(City).findOne({
    where: {
      id: id,
      forecasts: {
        type: ForecastType.CURRENT,
        for_date: Between(start, end),
      },
    },
    order: {
      forecasts: {
        for_date: "ASC",
      },
    },
    relations: ["forecasts"],
  });
};

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
