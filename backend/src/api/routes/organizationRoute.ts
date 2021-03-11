import { Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { createOrganization } from '../../services/organizationService';
import { getUserCurOrganization } from '../../services/userOrganizationService';

const router = Router();

router
  .get('/:orgId/user/:userId', run(req => getUserCurOrganization(req.params.userId, req.params.orgId)))
  .post('/', run(req => createOrganization(req.body)));

export default router;
