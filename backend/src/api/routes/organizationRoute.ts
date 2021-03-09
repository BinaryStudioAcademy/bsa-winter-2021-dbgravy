import { Request, Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { getUserOraganization } from '../../services/organizationService';

const router = Router();

router
  .get('/:orgId/user/:userId', run((req: Request) => (
    getUserOraganization(req.params.userId, req.params.orgId))));
// .post('/', run((req: Request) => createOrganization(req.body.userId, req.body.organizationName)));

export default router;
