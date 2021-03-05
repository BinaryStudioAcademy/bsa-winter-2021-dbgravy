import { NextFunction, Request, Response } from 'express';
import { IError } from '../../common/models/common/error';

export const errorHandlerMiddleware = (err: IError, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    next(err);
  } else {
    const { status = 500, message = '' } = err;
    res.status(status).send({ status, message });
  }
};
