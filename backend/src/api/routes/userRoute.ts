import { Router, Request } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { ITokenData } from '../../common/models/tokens/ITokenData';
import { getUsers, getUserById, switchUserOrganization } from '../../services/userService';
import { getUserDataFromToken } from '../../services/authService';
import { User } from '../../data/entities/User';

const router = Router();

router
  .get('/', run(getUsers))
  .get('/me', run(req => getUserDataFromToken(req.user as ITokenData)))
  .get('/:id', run(req => getUserById(req.params.id)))
  .put('/:id/switch-organization', run((req: Request) => switchUserOrganization(req.user as User, req.params.id)));

export default router;
