import { Router } from 'express';
import { Role } from '../../common/enums/Role';
import { run } from '../../common/helpers/routeHelper';
import { getQueries, addQuery, updateQueries, deleteQuery, runQuery } from '../../services/queryService';
import permissionMiddleware from '../middlewares/permissionsMiddleware';

const router = Router();

router
  .get('/:id', permissionMiddleware([Role.ADMIN, Role.DEVELOPER, Role.VIEWER]), run(req => getQueries(req.params.id)))
  .post('/run', permissionMiddleware([Role.ADMIN, Role.DEVELOPER]), run(req => runQuery(req.body)))
  .post('/', permissionMiddleware([Role.ADMIN, Role.DEVELOPER]), run(req => addQuery(req.body)))
  .put('/:id', permissionMiddleware([Role.ADMIN, Role.DEVELOPER]),
    run(req => updateQueries(req.params.id, req.body.data, req.body.appId)))
  .delete('/:id', permissionMiddleware([Role.ADMIN, Role.DEVELOPER]),
    run(req => deleteQuery(req.params.id, req.body.appId)));

export default router;
