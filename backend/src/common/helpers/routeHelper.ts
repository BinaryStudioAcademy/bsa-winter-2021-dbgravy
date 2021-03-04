import { Request, Response, NextFunction } from 'express';
// eslint-disable-next-line import/no-unresolved
import { ParamsDictionary, Params } from 'express-serve-static-core';

export const run = <P extends Params = ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = any>(
  method: (req?: Request<P, ResBody, ReqBody, ReqQuery>) => Promise<ResBody>
) => (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response,
    next: NextFunction
  ) => {
    method(req).then(result => (result ? res.send(result) : res.sendStatus(204))).catch(next);
  };
