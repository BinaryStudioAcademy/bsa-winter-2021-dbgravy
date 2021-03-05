import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as CustomStrategy } from 'passport-custom';
import * as userRepository from '../data/repositories/userRepository';
import { compare } from '../common/helpers/cryptoHelper';
import { IUser } from '../common/models/user/user';
import { IRegisterUser } from '../common/models/user/registerUser';
import { IError } from '../common/models/common/error';
import { extractUserDataFromTokem, refreshAccessToken, verifyToken } from '../common/helpers/tokenHelper';

passport.use(
  'sign-in',
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done): Promise<void> => {
    try {
      const user: IUser = await userRepository.getByEmail(email);
      if (!user) {
        return done({ status: 401, message: 'Incorrect email.' }, false);
      }

      return await compare(password, user.password)
        ? done(null, user)
        : done({ status: 401, message: 'Passwords do not match.' }, null, null);
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  'sign-up',
  new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' },
    async ({ body: { email, firstname, lastname } }, _username, password, done): Promise<void> => {
      try {
        const userByEmail = await userRepository.getByEmail(email);
        if (userByEmail) {
          return done({ status: 401, message: 'Email is already taken.' } as IError);
        }

        return done(null, { email, password, firstname, lastname } as IRegisterUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use('jwt-custom', new CustomStrategy(async (req, done) => {
  let accessToken = req.headers['x-access-token'] as string;
  const refreshToken = req.headers['x-refresh-token'] as string;

  const isValidAccessToken = await verifyToken(accessToken);

  if (!isValidAccessToken) {
    const isValidRefreshToken = await verifyToken(refreshToken);

    if (!isValidRefreshToken) done({ status: 401, message: 'Token is invalid.' } as IError);
    accessToken = refreshAccessToken(refreshToken);
  }
  const userData = extractUserDataFromTokem(accessToken);
  done(null, userData);
}));
