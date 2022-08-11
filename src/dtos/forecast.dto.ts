import { ForecastType } from '../entities/forecast';
import { OpenweatherForecast } from '../types';

export default class ForecastDto {
  public type: ForecastType;

  public temp: number;

  public temp_feels_like: number;

  public temp_min: number;

  public temp_max: number;

  public pressure: number;

  public humidity: number;

  public visibility: number;

  public weather_name: string;

  public weather_desc: string;

  public weather_icon: string;

  public wind_speed: number;

  public wind_deg: number;

  public wind_gust: number;

  public cloudiness: number;

  public for_date: Date;

  constructor(type: ForecastType, { ...forecast }: OpenweatherForecast) {
    this.type = type;
    this.temp = forecast.main.temp;
    this.temp_feels_like = forecast.main.feels_like;
    this.temp_min = forecast.main.temp_min;
    this.temp_max = forecast.main.temp_max;
    this.pressure = forecast.main.pressure;
    this.humidity = forecast.main.humidity;
    this.visibility = forecast.visibility;
    this.weather_name = forecast.weather[0]?.main;
    this.weather_desc = forecast.weather[0]?.description;
    this.weather_icon = forecast.weather[0]?.icon;
    this.wind_speed = forecast.wind.speed;
    this.wind_deg = forecast.wind.deg;
    this.wind_gust = forecast.wind.gust;
    this.cloudiness = forecast.clouds.all;
    this.for_date = new Date(forecast.dt * 1000);
  }
}
