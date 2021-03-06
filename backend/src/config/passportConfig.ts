import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import * as userRepository from '../data/repositories/userRepository';
import { compare } from '../common/helpers/cryptoHelper';
import { IUser } from '../common/models/user/user';
import { IRegisterUser } from '../common/models/user/registerUser';
import { IError } from '../common/models/common/error';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as CustomStrategy } from 'passport-custom';
import { secret } from './jwtConfig';
import { IJwtOptions } from '../common/models/jwt/jwtOptions';
import { extractUserIdFromTokem, verifyToken } from '../common/helpers/tokenHelper';

const options: IJwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

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

passport.use(new JwtStrategy(options, async ({ id }, done) => {
  try {
    const user = await userRepository.getById(id);
    return user ? done(null, user) : done({ status: 401, message: 'Token is invalid.' }, null);
  } catch (err) {
    return done(err);
  }
}));

passport.use('refresh-jwt', new CustomStrategy(async (req, done) => {
  const refreshToken = req.headers['x-refresh-token'] as string;
  const isValidRefreshToken = await verifyToken(refreshToken);
  if (isValidRefreshToken) {
    const userId = extractUserIdFromTokem(refreshToken);
    const user = await userRepository.getById(userId);
    return done(null, user);
  }
  return done({ status: 401, message: 'Token is invalid.' }, null);
}));
