import { Router, Request } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { ITokenData } from '../../common/models/tokens/ITokenData';
import { getUsers, getUserById } from '../../services/userService';
import { getUserDataFromToken } from '../../services/authService';

const router = Router();

router
  .get('/', run(getUsers))
  .get('/me', run((req: Request) => getUserDataFromToken(req.user as ITokenData)))
  .get('/:id', run((req: Request) => getUserById(req.params.id)));

export default router;
