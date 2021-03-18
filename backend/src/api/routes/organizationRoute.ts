import { Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { createOrganization } from '../../services/organizationService';
import { getUserCurOrganization } from '../../services/userOrganizationService';
import { ITransportedUser } from '../../common/models/user/ITransportedUser';

const router = Router();

router
  .get('/user', run(req => getUserCurOrganization(req.user as ITransportedUser)))
  .post('/', run(req => createOrganization(req.body)));

export default router;
