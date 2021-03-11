import { Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { getResources } from '../../services/resourceService';
import { ITransportedUser } from '../../common/models/user/ITransportedUser';

const router = Router();

router
  .get('/', run(() => resourceService.getResources()))
  .get('/:id', run((req: Request) => resourceService.getResourceById(req.params.id)))
  .post('/test', run((req: Request) => resourceService.testConnection(req.body)))
  .post('/', run((req: Request) => resourceService.create(req.body)))
  .put('/:id', run((req: Request) => resourceService.updateResource(req.params.id, req.body)))
  .delete('/:id', run((req: Request) => resourceService.deleteResource(req.params.id)));
  .get('/', run(req => getResources(req.user as ITransportedUser)));

export default router;
