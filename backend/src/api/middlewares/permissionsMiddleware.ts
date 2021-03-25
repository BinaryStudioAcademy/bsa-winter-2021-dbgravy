import { NextFunction, Request, Response } from 'express';
import { Role } from '../../common/enums/Role';
import { CustomError } from '../../common/models/error/CustomError';
import { User } from '../../data/entities/User';
import { OrganizationStatus } from '../../common/enums/OrganizationStatus'

export default (roles: Role[]) => async (req: Request, _res: Response, next: NextFunction) => {
  const { userOrganizations } = <User>req.user;
  const { role, status } = userOrganizations[0];
  return (roles.some(userRole => role === userRole && status === OrganizationStatus.ACTIVE)
    ? next()
    : next(new CustomError("User doesn't have permission to access this page", 403))
  );
};
