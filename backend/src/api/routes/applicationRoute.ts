import { Request, Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { addApp, deleteApp, getAppById, getApps, updateApp } from '../../services/applicationService';
import { ITransportedUser } from '../../common/models/user/ITransportedUser';

const router = Router();

router
  .get('/', run((req: Request) => getApps(req.user as ITransportedUser)))
  .get('/:id', run((req: Request) => getAppById(req.params.id)))
  .post('/', run((req: Request) => addApp(req.body, req.user as ITransportedUser)))
  .put('/:id', run((req: Request) => (
    updateApp(req.params.id, req.body.name, req.user as ITransportedUser))))
  .delete('/:id', run((req: Request) => deleteApp(req.params.id)));

export default router;
