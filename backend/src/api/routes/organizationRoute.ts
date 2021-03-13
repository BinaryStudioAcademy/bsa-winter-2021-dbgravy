import { Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { createOrganization, getCurrentOrganization } from '../../services/organizationService';
import { getUserCurOrganization } from '../../services/userOrganizationService';
import { ITransportedUser } from '../../common/models/user/ITransportedUser';

const router = Router();

router
  .get('/user', run(req => getCurrentOrganization(req.user as ITransportedUser)))
  .get('/:orgId/user/:userId', run(req => getUserCurOrganization(req.params.userId, req.params.orgId)))
  .post('/', run(req => createOrganization(req.body)));

export default router;
