import { Router } from 'express';
import { IRegisterUser } from '../../common/models/user/registerUser';
import { IUser } from '../../common/models/user/user';
import * as authService from '../../services/authService';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import registrationMiddleware from '../middlewares/registrationMiddleware';
// import jwtMiddleware from '../middlewares/jwtMiddleware';

const router: Router = Router();

// user added to the request (req.user) in a strategy, see passport config
router
  .post('/sign-in', authenticationMiddleware, (req, res, next) => authService.login(req.user as IUser)
    .then(data => res.send(data))
    .catch(next))
  .post('/sign-up', registrationMiddleware, (req, res, next) => authService.register(req.user as IRegisterUser)
    .then(data => res.send(data))
    .catch(next));

export default router;
