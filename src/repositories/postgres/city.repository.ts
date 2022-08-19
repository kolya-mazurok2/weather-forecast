import { MoreThanOrEqual } from 'typeorm';
import { dataSource } from '../../config/db/postgres';
import { City } from '../../entities/city';
import { ForecastType } from '../../entities/forecast';
import { todayStartDate } from '../../utils/date';

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
      id,
    },
  });

export const getCityForecasts = async (
  id: number,
  type: ForecastType = ForecastType.CURRENT
): Promise<City | null> =>
  dataSource.getRepository(City).findOne({
    where: {
      id,
      forecasts: {
        type,
        for_date: MoreThanOrEqual(todayStartDate()),
      },
    },
    order: {
      forecasts: {
        for_date: 'ASC',
      },
    },
    relations: ['forecasts'],
  });

export const getCities = async (): Promise<City[]> => dataSource.getRepository(City).find();
