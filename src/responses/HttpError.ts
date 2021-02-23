
export class HttpError extends Error {

  public timestamp: Date;
  public status: number;
  public message: string;

  constructor (
    timestamp: Date = new Date(),
    status: number = 500,
    message: string = 'Something went wrong') {
  super();
  this.timestamp = timestamp;
  this.status = status;
  this.message = message;
  }
}
