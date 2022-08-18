import { dataSource } from '../../config/database';
import ForecastDto from '../../dtos/forecast.dto';
import { City } from '../../entities/city';
import { Forecast, ForecastType } from '../../entities/forecast';
import { getCities } from '../../repositories/city.repository';
import {
  createForecast,
  deleteForecastsByIds,
  getForecastsIdsBeforeDate,
  getLastForecast,
  updateForecast,
} from '../../repositories/forecast.repository';
import { OpenweatherForecast } from '../../types';
import { getNDaysAgo } from '../../utils/date';
import { get5day3hours, getCurrent } from '../http/openweathermap';

const createEntity = async (type: ForecastType, inputForecast: OpenweatherForecast, city: City) => {
  const forecast = await createForecast(new ForecastDto(type, inputForecast));

  if (forecast) {
    forecast.city = city;
    updateForecast(forecast);
  }
};

const sync = async (type: ForecastType, receiver: (payload: any) => Promise<any>) => {
  const cities = await getCities();
  if (!cities.length) {
    return;
  }

  for (const city of cities) {
    const response = await receiver({
      lat: city.latitude,
      lon: city.longitude,
    });

    if (!response.data) {
      return;
    }

    if (Array.isArray(response.data)) {
      const lastForecast = await getLastForecast(city.id);
      const forecasts = lastForecast
        ? response.data.filter(
            (forecast: OpenweatherForecast) =>
              forecast.dt > new Date(lastForecast.for_date).getTime() / 1000
          )
        : response.data;

      for (const forecast of forecasts) {
        createEntity(type, forecast, city);
      }
    } else {
      createEntity(type, response.data, city);
    }
  }
};

export const syncCurrentForecasts = async () => {
  sync(ForecastType.CURRENT, getCurrent);
};

export const sync5day3hoursForecasts = async () => {
  sync(ForecastType.DAY5_HOUR3, get5day3hours);
};

const deleteEntities = async (type: ForecastType) => {
  const nDays = type === ForecastType.CURRENT ? 2 : 6;

  const ids = await getForecastsIdsBeforeDate(type, getNDaysAgo(nDays));

  if (ids.length) {
    deleteForecastsByIds(ids);
  }
};

export const deleteOldCurrentForecasts = () => deleteEntities(ForecastType.CURRENT);

export const deleteOld5days3hoursForecasts = () => deleteEntities(ForecastType.DAY5_HOUR3);
