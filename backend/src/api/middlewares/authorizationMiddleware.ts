import { NextFunction, Request, Response } from 'express';
import jwtMiddleware from './jwtMiddleware';

export default (routesWhiteList: (string | RegExp)[] = []) => (req: Request, res: Response, next: NextFunction) => (
  routesWhiteList.some(route => req.path.match(route))
    ? next()
    : jwtMiddleware(req, res, next));
