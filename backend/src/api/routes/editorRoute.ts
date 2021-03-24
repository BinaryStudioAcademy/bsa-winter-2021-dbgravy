import { Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import {
  deleteComponent,
  getComponentById,
  getComponentsByAppId,
  updateComponent
} from '../../services/editorService';

const router = Router();

router
  .get('/:appId', run(req => getComponentsByAppId(req.params.appId)))
  .get('/:id', run(req => getComponentById(req.params.id)))
  .put('/:id', run(req => updateComponent(req.params.id, req.body)))
  .delete('/:id', run(req => deleteComponent(req.params.id)));

export default router;
