import { errorMessages } from "./constants";

export default class ApiError extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message: string) {
    return new ApiError(400, message);
  }

  static notFound() {
    return new ApiError(404, errorMessages[404]);
  }

  static internal() {
    return new ApiError(500, errorMessages[500]);
  }
}
