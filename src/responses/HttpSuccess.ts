
export class HttpSuccess {

  public timestamp: Date;
  public status: number;
  public message: string;
  public data: [] | object;

  constructor (
    additionalData: [] | object,
    message = 'OK',
    timestamp: Date = new Date(),
    status = 200 ) {
  this.timestamp = timestamp;
  this.status = status;
  this.message = message;
  this.data = additionalData;
  }
}