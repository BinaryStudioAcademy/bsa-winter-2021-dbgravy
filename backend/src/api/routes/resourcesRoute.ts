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

const router = Router();

router
  .get('/:id', run(req => getResourceById(req.params.id)))
  .put('/:id', run(req => updateResource(req.params.id, req.body.resource)))
  .get('/', run(req => getResources(req.user as ITransportedUser)))
  .post('/', run(req => addResource(req.body.resource, req.user as ITransportedUser)))
  .post('/test', run(req => testResource(req.body.resource)))
  .post('/take', run(req => takeResourceTable(req.body.resource)))
  .delete('/:id', run(req => deleteResource(req.params.id)));

export default router;
