import { Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { createOrganization } from '../../services/organizationService';
import { getUserOrganization } from '../../services/userOrganizationService';

const router = Router();

router
  .get('/:orgId/user/:userId', run(req => getUserOrganization(req.params.userId, req.params.orgId)))
  .post('/', run(req => createOrganization(req.body)));

export default router;
