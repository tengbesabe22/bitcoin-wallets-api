import { HttpError } from './HttpError';

export class BadError extends HttpError {
  constructor(message: string = 'Not Found Error') {
    super(new Date(), 400, message);
  }
}