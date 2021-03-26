import { Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { addApp, deleteApp, getAppById, getApps, updateApp } from '../../services/applicationService';
import { ITransportedUser } from '../../common/models/user/ITransportedUser';
import permissionMiddleware from '../middlewares/permissionsMiddleware';
import { Role } from '../../common/enums/Role';

const router = Router();

router
  .get('/', run(req => getApps(req.user as ITransportedUser)))
  .get('/:id', run(req => getAppById(req.params.id)))
  .post('/', permissionMiddleware([Role.ADMIN, Role.DEVELOPER]),
    run(req => addApp(req.body, req.user as ITransportedUser)))
  .put('/:id', permissionMiddleware([Role.ADMIN, Role.DEVELOPER]),
    run(req => (updateApp(req.params.id, req.body.name, req.user as ITransportedUser))))
  .delete('/:id', permissionMiddleware([Role.ADMIN]), run(req => deleteApp(req.params.id)));

export default router;
