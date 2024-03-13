/**
 * CustomError class, creates a custom error
 * @class CustomError
 * @extends {Error} Error
 * @param message The error message
 * @param status The error status code
 */

export default class CustomError extends Error {
  status = 400;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
