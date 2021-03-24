import { Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { addComponent, getComponents, updateComponent, addInput } from '../../services/editorService';

const router = Router();

router
  .get('/:appId', run(req => getComponents(req.params.appId)))
  .post('/input', run(req => addInput(req.body.input)))
  .post('/', run(req => addComponent(req.body.appId, req.body.component)))
  .put('/', run(req => updateComponent(req.body.component)));

export default router;
