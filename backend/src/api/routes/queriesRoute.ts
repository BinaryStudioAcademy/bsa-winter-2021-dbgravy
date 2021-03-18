import { Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { getQueries, addQuery, updateQueries, deleteQuery, runQuery } from '../../services/queryService';

const router = Router();

router
  .get('/:id', run(req => getQueries(req.params.id)))
  .post('/test', run(req => runQuery(req.body.query)))
  .post('/', run(req => addQuery(req.body)))
  .put('/:id', run(req => updateQueries(req.params.id, req.body.data, req.body.appId)))
  .delete('/:id', run(req => deleteQuery(req.params.id, req.body.appId)));

export default router;
