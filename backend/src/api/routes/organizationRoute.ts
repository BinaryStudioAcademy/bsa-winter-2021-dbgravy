import { Request, Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { createOrganization } from '../../services/organizationService';
import { getUserOraganization } from '../../services/userOrganizationService';

const router = Router();

router
  .get('/:orgId/user/:userId', run((req: Request) => (
    getUserOraganization(req.params.userId, req.params.orgId))))
  .post('/', run((req: Request) => createOrganization(req.body)));

export default router;
