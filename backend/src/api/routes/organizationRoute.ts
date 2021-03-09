import { Request, Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { getUserByOraganization, createOrganization } from '../../services/organizationService';

const router = Router();

router
  .get('/organization/:orgId/user/:userId', run((req: Request) => (
    getUserByOraganization(req.params.userId, req.params.orgId))))
  .post('/organization', run((req: Request) => createOrganization(req.body.userId, req.body.organizationName)));

export default router;
