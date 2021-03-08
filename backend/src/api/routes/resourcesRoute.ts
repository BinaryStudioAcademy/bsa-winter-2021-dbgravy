import { Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { getResources } from '../../services/resourceService';

const router = Router();

router
  .get('/', run(getResources));

export default router;
