/* eslint-disable no-console */
/* eslint-disable indent */
import { Router } from 'express';
import { IRegisterUser } from '../../common/models/user/IRegisterUser';
import {
  refreshToken,
  login,
  register,
  removeToken,
  forgotPassword,
  resetPassword
} from '../../services/authService';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import registrationMiddleware from '../middlewares/registrationMiddleware';
import userMiddleware from '../middlewares/userMiddleware';
import {
  jwtNewPassMiddleware
} from '../middlewares/jwtMiddleware';
import { run } from '../../common/helpers/routeHelper';
import refreshTokenMiddleware from '../middlewares/refreshTokenMiddleware';
import { ITransportedUser } from '../../common/models/user/ITransportedUser';

const router: Router = Router();

// user added to the request (req.user) in a strategy, see passport config
router
  .post('/token', refreshTokenMiddleware, run(req => refreshToken(req.user as ITransportedUser, req.body.refreshToken)))
  .post('/sign-in', authenticationMiddleware, run(req => (
    login(req.user as ITransportedUser, req.body.currentOrganizationId))))
  .post('/sign-up', registrationMiddleware, run(req => register(req.body.organizationName, req.user as IRegisterUser)))
  .post('/forgotpass', userMiddleware, run(req => forgotPassword(req.body)))
  .post('/resetpass', jwtNewPassMiddleware, run(req => resetPassword(req.user as ITransportedUser, req.body.password)))
  .delete('/tokens', run(req => removeToken(req.body.token)));

export default router;
