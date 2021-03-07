import { Request, Router } from 'express';
import { IRegisterUser } from '../../common/models/user/IRegisterUser';
import * as authService from '../../services/authService';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import registrationMiddleware from '../middlewares/registrationMiddleware';
import { run } from '../../common/helpers/routeHelper';
import refreshTokenMiddleware from '../middlewares/refreshTokenMiddleware';
import { ITransportedUser } from '../../common/models/user/ITransportedUser';

const router: Router = Router();

// user added to the request (req.user) in a strategy, see passport config
router
  .post('/token', refreshTokenMiddleware, run((req: Request) => authService.refreshToken(req.user as ITransportedUser)))
  .post('/sign-in', authenticationMiddleware, run((req: Request) => authService.login(req.user as ITransportedUser)))
  .post('/sign-up', registrationMiddleware, run((req: Request) => authService.register(req.user as IRegisterUser)));

export default router;
