import { dataSource } from "../config/database";
import { City } from "../entities/city";
import { Forecast, ForecastType } from "../entities/forecast";

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

export const getForecast = async (id: number): Promise<Forecast | null> =>
  dataSource.getRepository(Forecast).findOneBy({ id: id });

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
      for_date: "DESC",
    },
  });

export const createForecast = async (
  payload: ForecastPayload
): Promise<Forecast | null> => {
  const repository = dataSource.getRepository(Forecast);
  const forecast = new Forecast();

  return repository.save({ ...forecast, ...payload });
};

export const updateForecast = async (
  payload: ForecastUpdatePayload
): Promise<Forecast | null> => {
  const repository = dataSource.getRepository(Forecast);

  const ForecastToUpdate = await repository.findOneBy({ id: payload.id });
  if (!ForecastToUpdate) {
    return null;
  }

  return repository.save({ ...ForecastToUpdate, ...payload });
};

export const deleteForecast = async (id: number): Promise<Boolean> => {
  const deleteResult = await dataSource.getRepository(Forecast).delete(id);

  return Boolean(deleteResult.affected);
};
