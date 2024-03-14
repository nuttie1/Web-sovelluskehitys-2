import {NextFunction, Request, Response} from 'express';
import CustomError from './classes/CustomError';
import {ErrorResponse} from './types/MessageTypes';

/**
 * Middleware for handling 404 errors
 * @param req 
 * @param res 
 * @param next 
 */
const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(`🔍 - Not Found - ${req.originalUrl}`, 404);
  next(error);
};

/**
 * Middleware for handling errors
 * @param err 
 * @param req 
 * @param res 
 * @param next 
 */
const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction,
) => {
  console.error('errorHandler', err.message);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

export {notFound, errorHandler};