export const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export const DEFAULT_HEADERS = {
  Accept: "application/json",
};

type UNITS = "metric";

interface QueryParams {
  appid: string;
  units: UNITS;
}

export const DEFAULT_QUERY_PARAMS: QueryParams = {
  appid: process.env.OPENWEATHERMAP_APP_ID || "",
  units: "metric",
};

export interface HTTPResponse<T> {
  success: boolean;
  data: T;
}

export const DEFAULT_RESPONSE: HTTPResponse<null> = {
  success: true,
  data: null,
};
