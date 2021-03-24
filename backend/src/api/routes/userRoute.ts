import { Request, Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { ITokenData } from '../../common/models/tokens/ITokenData';
import { getUserById, getUsers, switchUserOrganization } from '../../services/userService';
import { getUserDataFromToken } from '../../services/authService';
import { ITransportedUser } from '../../common/models/user/ITransportedUser';

const router = Router();

router
  .get('/', run(getUsers))
  .get('/me', run(req => getUserDataFromToken(req.user as ITokenData)))
  .get('/:id', run(req => getUserById(req.params.id)))
  .put('/switch-organization',
    run((req: Request) => switchUserOrganization(req.body.organizationId, req.user as ITransportedUser)));

export default router;
