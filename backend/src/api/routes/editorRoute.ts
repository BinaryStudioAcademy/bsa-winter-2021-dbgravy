import { Router } from 'express';
import { Role } from '../../common/enums/Role';
import { run } from '../../common/helpers/routeHelper';
import {
  addComponent,
  deleteComponent,
  getComponentById,
  getComponentsByAppId,
  updateComponent
} from '../../services/editorService';
import permissionMiddleware from '../middlewares/permissionsMiddleware';

const router = Router();

router
  .get('/:appId', permissionMiddleware([Role.ADMIN, Role.DEVELOPER]),
    run(req => getComponentsByAppId(req.params.appId)))
  .get('/:id', permissionMiddleware([Role.ADMIN, Role.DEVELOPER]), run(req => getComponentById(req.params.id)))
  .post('/:appId', permissionMiddleware([Role.ADMIN, Role.DEVELOPER]),
    run(req => addComponent(req.params.appId, req.body)))
  .put('/:id', permissionMiddleware([Role.ADMIN, Role.DEVELOPER]),
    run(req => updateComponent(req.params.id, req.body)))
  .delete('/:id', permissionMiddleware([Role.ADMIN, Role.DEVELOPER]), run(req => deleteComponent(req.params.id)));

export default router;
