import { Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { getResources } from '../../services/resourceService';
import { ITransportedUser } from '../../common/models/user/ITransportedUser';

const router = Router();

router
  .get('/', run(req => getResources(req.user as ITransportedUser)));

export default router;
