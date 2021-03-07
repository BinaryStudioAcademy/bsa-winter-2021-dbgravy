import { Request, Router } from 'express';
import { IRegisterUser } from '../../common/models/user/registerUser';
import * as authService from '../../services/authService';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import registrationMiddleware from '../middlewares/registrationMiddleware';
import jwtMiddleware from '../middlewares/jwtMiddleware';
import { run } from '../../common/helpers/routeHelper';
import { ITokenData } from '../../common/models/tokens/tokenData';
import refreshTokenMiddleware from '../middlewares/refreshTokenMiddleware';
import { ITransportedUser } from '../../common/models/user/transportedUser';

const router: Router = Router();

// user added to the request (req.user) in a strategy, see passport config
router
  .post('/me', jwtMiddleware, run((req: Request) => authService.getUserDataFromToken(req.user as ITokenData)))
  .post('/token', refreshTokenMiddleware, run((req: Request) => authService.refreshToken(req.user as ITransportedUser)))
  .post('/sign-in', authenticationMiddleware, run((req: Request) => authService.login(req.user as ITransportedUser)))
  .post('/sign-up', registrationMiddleware, run((req: Request) => authService.register(req.user as IRegisterUser)));

export default router;