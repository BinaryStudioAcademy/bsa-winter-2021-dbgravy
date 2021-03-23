import { Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import {
  addComponent,
  deleteComponent,
  getComponentById,
  getComponentsByAppId,
  updateComponent
} from '../../services/editorService';

const router = Router();

router
  .get('/:appId', run(req => getComponentsByAppId(req.params.appId)))
  .get('/:id', run(req => getComponentById(req.params.id)))
  .post('/:appId', run(req => addComponent(req.params.appId, req.body)))
  .put(':id', run(req => updateComponent(req.params.id, req.body)))
  .delete('/:id', run(req => deleteComponent(req.params.id)));

export default router;
