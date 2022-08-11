import axios from 'axios';
import { OpenweatherForecast } from '../../../types';
import {
  BASE_URL,
  DEFAULT_HEADERS,
  DEFAULT_QUERY_PARAMS,
  DEFAULT_RESPONSE,
  HTTPResponse,
} from './constants';

const openweathermap = axios.create({
  baseURL: BASE_URL,
  headers: {
    ...DEFAULT_HEADERS,
  },
});

interface Payload {
  lat: number;
  lon: number;
}

export const getCurrent = async (
  payload: Payload
): Promise<HTTPResponse<OpenweatherForecast | null>> => {
  try {
    const response = await openweathermap.get('weather', {
      params: {
        ...DEFAULT_QUERY_PARAMS,
        ...payload,
      },
    });

    return {
      ...DEFAULT_RESPONSE,
      data: response.data,
    };
  } catch (error) {
    return {
      ...DEFAULT_RESPONSE,
      success: false,
    };
  }
};

export const get5day3hours = async (
  payload: Payload
): Promise<HTTPResponse<OpenweatherForecast[]>> => {
  try {
    const response = await openweathermap.get('forecast', {
      params: {
        ...DEFAULT_QUERY_PARAMS,
        ...payload,
      },
    });

    return {
      ...DEFAULT_RESPONSE,
      data: response.data.list,
    };
  } catch (error) {
    return {
      data: [],
      success: false,
    };
  }
};

export default openweathermap;
