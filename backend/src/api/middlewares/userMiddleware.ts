import { Request, Response, NextFunction } from 'express';
import {
  HTTP_STATUS_ERROR_BAD_REQUEST
} from '../../common/constants/http';
import {
  REGEXP_EMAIL
} from '../../common/constants/regexp';

const validateEmail = (trialEmail: string) => {
  if (!trialEmail.trim()) {
    throw new Error('Email field must be filled!');
  }
  const checkRegexp = trialEmail.match(REGEXP_EMAIL);
  if (!checkRegexp) {
    throw new Error('Email must be like name@domein!');
  }
};

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    validateEmail(req.body.email);
    return next();
  } catch (err) {
    return res.status(HTTP_STATUS_ERROR_BAD_REQUEST)
      .json({
        error: true,
        message: err.message
      });
  }
};

