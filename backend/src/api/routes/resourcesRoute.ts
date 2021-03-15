import { Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { getResources, deleteResource, updateResource } from '../../services/resourceService';
import { ITransportedUser } from '../../common/models/user/ITransportedUser';

const router = Router();

router
  .get('/', run(req => getResources(req.user as ITransportedUser)))
  .delete('/:id', run(req => deleteResource(req.params.id)))
  .put('/:id', run(req => updateResource(req.params.id, req.body)));

export default router;
