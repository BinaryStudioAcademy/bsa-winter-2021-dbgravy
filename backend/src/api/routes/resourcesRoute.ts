import { Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import {
  getResources,
  addResource,
  getResourceById,
  updateResource,
  testResource,
  deleteResource, takeResourceTable
} from '../../services/resourceService';
import { ITransportedUser } from '../../common/models/user/ITransportedUser';
import permissionMiddleware from '../middlewares/permissionsMiddleware';
import { Role } from '../../common/enums/Role';

const router = Router();

router
  .get('/:id', run(req => getResourceById(req.params.id)))
  .put('/:id', permissionMiddleware([Role.ADMIN, Role.DEVELOPER]),
    run(req => updateResource(req.params.id, req.body.resource)))
  .get('/', run(req => getResources(req.user as ITransportedUser)))
  .post('/', permissionMiddleware([Role.ADMIN, Role.DEVELOPER]),
    run(req => addResource(req.body.resource, req.user as ITransportedUser)))
  .post('/test', permissionMiddleware([Role.ADMIN, Role.DEVELOPER]),
    run(req => testResource(req.body.resource)))
  .post('/take', run(req => takeResourceTable(req.body.resource)))
  .delete('/:id', permissionMiddleware([Role.ADMIN]), run(req => deleteResource(req.params.id)));

export default router;
