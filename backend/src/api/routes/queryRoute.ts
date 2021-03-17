import { Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { runQuery } from '../../services/queryService';

const router = Router();

router
  .post('/', run(req => runQuery(req.body.query)));

export default router;
