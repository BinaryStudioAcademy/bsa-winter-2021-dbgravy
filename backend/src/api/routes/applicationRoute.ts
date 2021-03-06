import { Router, Request } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { addApp, getAppById, updateApp, deleteApp, getApps } from '../../services/applicationService';

const router = Router();

router
  .get('/', run(getApps))
  .get('/:id', run((req: Request) => getAppById(req.params.id)))
  .post('/', run((req: Request) => addApp(req.body)))
  .put('/:id', run((req: Request) => updateApp(req.params.id, req.body.name)))
  .delete('/:id', run((req: Request) => deleteApp(req.params.id)));

export default router;
