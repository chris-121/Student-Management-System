export class NotFoundError extends Error {
  status: number;

  constructor(message: string = "Not Found") {
    super(message);
    this.name = "NotFoundError";
    this.status = 404;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class BadRequestError extends Error {
  status: number;

  constructor(message: string = "Bad Request") {
    super(message);
    this.name = "BadRequestError";
    this.status = 400;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class UnauthorizedError extends Error {
  status: number;

  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
    this.status = 401;
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
