import { Router, Request } from 'express';
import { run } from '../../common/helpers/routeHelper';
import * as UOSerevice from '../../services/userOrganizationService';

const router = Router();

router
  .get('/:organizationId', run((req: Request) => UOSerevice.getUsers(req.params.organizationId)))
  .post('/', run((req: Request) => UOSerevice.createUserOrganization(req.body)));
// .put('/', run((req: Request) => updateUserOrganization(req.body)))
// .post('/resend', run((req: Request) => resendInvite(req.body)));

export default router;
