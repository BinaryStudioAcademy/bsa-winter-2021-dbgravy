import { Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import * as UOService from '../../services/userOrganizationService';
import { ITransportedUser } from '../../common/models/user/ITransportedUser';
import permissionMiddleware from '../middlewares/permissionsMiddleware';
import { Role } from '../../common/enums/Role';

const router = Router();

router
  .get('/',
    run(req => UOService.getUserOrganizations(req.user as ITransportedUser)))
  .get('/:organizationId', permissionMiddleware([Role.ADMIN]),
    run(req => UOService.getUsers(req.params.organizationId)))
  .get('/invite/:inviteToken', permissionMiddleware([Role.ADMIN]),
    run(req => UOService.checkInviteUser(req.params.inviteToken)))
  .post('/', permissionMiddleware([Role.ADMIN]),
    run(req => UOService.createUserOrganization(req.body)))
  .put('/', permissionMiddleware([Role.ADMIN]),
    run(req => UOService.updateUserOrganization(req.body)))
  .post('/resend', permissionMiddleware([Role.ADMIN]),
    run(req => UOService.resendInvite(req.body.email, req.user as ITransportedUser)))
  .post('/switch', run(req => (
    UOService.switchUserToOrganization(req.body.organizationId, req.user as ITransportedUser))));

export default router;
