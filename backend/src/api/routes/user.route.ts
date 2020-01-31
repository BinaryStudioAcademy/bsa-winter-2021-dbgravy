import { Router, Request } from 'express';
import { run } from '../../common/utils/route.helper';
import { getUsers, getUserById } from '../../services/user.service';

const router = Router();

router
  .get('/', run(getUsers))
  .get('/:id', run((req: Request) => getUserById(req.params.id)));

export default router;
