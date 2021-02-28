import * as express from 'express';
import Logger from '../utils/logger.utils';

const logger = new Logger();

export function loggerMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  logger.info(`${req.method} ${req.originalUrl}`);
  const start = new Date().getTime();
  res.on('finish', () => {
    const elapsed = new Date().getTime() - start;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${elapsed}ms`)
  });
  next();
}