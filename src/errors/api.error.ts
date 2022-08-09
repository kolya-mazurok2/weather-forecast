import { errorMessages } from "./constants";

export default class ApiError extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message = errorMessages[400]) {
    return new ApiError(400, message);
  }

  static notFound(message = errorMessages[404]) {
    return new ApiError(404, message);
  }

  static internal(message = errorMessages[500]) {
    return new ApiError(500, message);
  }

  static unauthorized(message = errorMessages[401]) {
    return new ApiError(401, message);
  }
}
