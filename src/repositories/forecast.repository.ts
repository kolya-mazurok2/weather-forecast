import { Between } from 'typeorm';
import { dataSource } from '../config/database';
import { City } from '../entities/city';
import { Forecast, ForecastType } from '../entities/forecast';
import { todayEndDate, todayStartDate } from '../utils/date';

export interface ForecastPayload {
  type: ForecastType;
  temp: number;
  temp_feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure?: number;
  humidity?: number;
  visibility?: number;
  weather_name?: string;
  weather_desc?: string;
  weather_icon?: string;
  wind_speed?: number;
  wind_deg?: number;
  wind_gust?: number;
  cloudiness?: number;
  for_date: Date;
  city?: City;
}

export type ForecastUpdatePayload = ForecastPayload & {
  id: number;
};

export const getCurrentForecast = async (id: number): Promise<Forecast | null> =>
  dataSource.getRepository(Forecast).findOne({
    where: {
      id,
      type: ForecastType.CURRENT,
    },
  });

export const getCurrentForecastsByCityId = async (cityId: number): Promise<Forecast | null> =>
  dataSource.getRepository(Forecast).findOne({
    where: {
      type: ForecastType.CURRENT,
      for_date: Between(todayStartDate(), todayEndDate()),
      city: {
        id: cityId,
      },
    },
    order: {
      for_date: 'DESC',
    },
  });

export const getLastForecast = async (
  id: number,
  type: ForecastType = ForecastType.DAY5_HOUR3
): Promise<Forecast | null> =>
  dataSource.getRepository(Forecast).findOne({
    where: {
      type,
      city: {
        id,
      },
    },
    order: {
      for_date: 'DESC',
    },
  });

export const getForecastsIdsBeforeDate = async (
  type: ForecastType = ForecastType.CURRENT,
  beforeDate: Date
): Promise<number[]> =>
  dataSource
    .getRepository(Forecast)
    .createQueryBuilder('forecast')
    .select('forecast.id')
    .where('forecast.type = :type', { type })
    .andWhere('forecast.for_date < :beforeDate', { beforeDate })
    .getRawMany();

export const createForecast = async (payload: ForecastPayload): Promise<Forecast | null> => {
  const repository = dataSource.getRepository(Forecast);
  const forecast = new Forecast();

  return repository.save({ ...forecast, ...payload });
};

export const updateForecast = async (payload: ForecastUpdatePayload): Promise<Forecast | null> => {
  const repository = dataSource.getRepository(Forecast);

  const ForecastToUpdate = await repository.findOneBy({ id: payload.id });
  if (!ForecastToUpdate) {
    return null;
  }

  return repository.save({ ...ForecastToUpdate, ...payload });
};

export const deleteForecast = async (id: number): Promise<boolean> => {
  const deleteResult = await dataSource.getRepository(Forecast).delete(id);

  return Boolean(deleteResult.affected);
};

export const deleteForecastsByIds = async (ids: number[]) =>
  dataSource
    .createQueryBuilder()
    .delete()
    .from(Forecast)
    .where('forecast.id IN (:...ids)', { ids: ids });
