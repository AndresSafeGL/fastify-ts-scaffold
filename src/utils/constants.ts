export class HttpError extends Error {
  statusCode: number;

  // @ts-ignore
  message: string;

  data: any;

  constructor(message: string, statusCode = 500, data?: any) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized", data?: any) {
    super(message, 401, data);
  }
}

export class BadRequestError extends HttpError {
  constructor(message = "Bad Request", data?: any) {
    super(message, 400, data);
  }
}
