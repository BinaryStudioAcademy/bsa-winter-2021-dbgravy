import { Request, Response, NextFunction } from 'express';
import forgotPasswordSchema from '../../common/models/forgetPassword/forgotPasswordSchema';
import {
  HttpStatusCode
} from '../../common/constants/http';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    await forgotPasswordSchema.validate(req.body);
    return next();
  } catch (err) {
    return res.status(HttpStatusCode.BAD_REQUEST)
      .json({
        error: true,
        message: err.message
      });
  }
};

