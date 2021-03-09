import { Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import * as UOSerevice from '../../services/userOrganizationService';

const router = Router();

router
  .get('/:organizationId', run(req => UOSerevice.getUsers(req.params.organizationId)))
  .post('/', run(req => UOSerevice.createUserOrganization(req.body)))
  .put('/', run(req => UOSerevice.updateUserOrganization(req.body)))
  .post('/resend', run(req => UOSerevice.resendInvite(req.body.email)));

export default router;
