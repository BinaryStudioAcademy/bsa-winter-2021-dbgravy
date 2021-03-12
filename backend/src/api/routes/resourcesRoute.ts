import { Router, Request } from 'express';
import { run } from '../../common/helpers/routeHelper';
import * as resourceService from '../../services/resourcesService';

const router = Router();

router
  .get('/', run(() => resourceService.getResources()))
  .get('/:id', run((req: Request) => resourceService.getResourceById(req.params.id)))
  .post('/test', run((req: Request) => resourceService.testConnectionService(req.body)))
  .post('/', run((req: Request) => resourceService.create(req.body)))
  .put('/:id', run((req: Request) => resourceService.updateResource(req.params.id, req.body)))
  .delete('/:id', run((req: Request) => resourceService.deleteResource(req.params.id)));

export default router;
