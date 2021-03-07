import { Router, Request } from 'express';
import { run } from '../../common/helpers/routeHelper';
import {
  getUsers,
  updateUserOrganization,
  createUserOrganization,
  resendInvite } from '../../services/userOrganizationService';

const router = Router();

router
  .get('/:organizationId', run((req: Request) => getUsers(req.params.organizationId)))
  .post('/', run((req: Request) => createUserOrganization(req.body)))
  .put('/', run((req: Request) => updateUserOrganization(req.body)))
  .post('/resend', run((req: Request) => resendInvite(req.body)));

export default router;
