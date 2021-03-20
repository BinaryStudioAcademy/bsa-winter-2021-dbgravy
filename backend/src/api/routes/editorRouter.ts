import { Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { addComponent, getComponents, updateComponent } from '../../services/editorService';

const router = Router();

router
  .get('/:appId', run(req => getComponents(req.params.appId)))
  .post('/', run(req => addComponent(req.body)))
  .put('/', run(req => updateComponent(req.body)));
// .delete('/:id', run(req => deleteQuery(req.params.id, req.body.appId)));

export default router;
