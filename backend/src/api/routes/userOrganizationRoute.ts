import { Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import * as UOService from '../../services/userOrganizationService';
import { ITransportedUser } from '../../common/models/user/ITransportedUser';

const router = Router();

router
  .get('/:organizationId', run(req => UOService.getUsers(req.params.organizationId)))
  .get('/invite/:inviteToken', run(req => UOService.checkInviteUser(req.params.inviteToken)))
  .post('/', run(req => UOService.createUserOrganization(req.body)))
  .put('/', run(req => UOService.updateUserOrganization(req.body)))
  .post('/resend', run(req => UOService.resendInvite(req.body.email)));

export default router;
