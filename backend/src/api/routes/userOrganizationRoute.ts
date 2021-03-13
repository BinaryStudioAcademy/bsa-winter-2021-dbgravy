import { Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import * as UOSerevice from '../../services/userOrganizationService';
import { ITransportedUser } from '../../common/models/user/ITransportedUser';

const router = Router();

router
  .get('/:organizationId', run(req => UOSerevice.getUsers(req.params.organizationId)))
  .get('/invite/:inviteToken', run(req => UOSerevice.checkInviteUser(req.params.inviteToken)))
  .post('/', run(req => UOSerevice.createUserOrganization(req.body)))
  .put('/', run(req => UOSerevice.updateUserOrganization(req.body)))
  .post('/resend', run(req => UOSerevice.resendInvite(req.body.email, req.user as ITransportedUser)));

export default router;
