import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as CustomStrategy } from 'passport-custom';
import { getCustomRepository } from 'typeorm';
import { compare } from '../common/helpers/cryptoHelper';
import { IRegisterUser } from '../common/models/user/IRegisterUser';
import { IError } from '../common/models/error/IError';
import { secret } from './jwtConfig';
import { IJwtOptions } from '../common/models/tokens/IJwtOptions';
import { extractUserIdFromTokem, verifyToken } from '../common/helpers/tokenHelper';
import { UserRepository } from '../data/repositories/userRepository';
import { User } from '../data/entities/User';
import { extractTransportedUser } from '../common/helpers/userExtractorHelper';

const options: IJwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

passport.use(
  'sign-in',
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done): Promise<void> => {
    try {
      const userRepository = getCustomRepository(UserRepository);
      const user: User = await userRepository.getByEmail(email);
      if (!user) {
        return done({ status: 401, msg: 'Incorrect email.' } as IError, false);
      }

      return await compare(password, user.password)
        ? done(null, extractTransportedUser(user))
        : done({ status: 401, msg: 'Passwords do not match.' } as IError, null, null);
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
        const userRepository = getCustomRepository(UserRepository);
        const userByEmail: User = await userRepository.getByEmail(email);
        if (userByEmail) {
          return done({ status: 401, msg: 'Email is already taken.' } as IError);
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
    const userRepository = getCustomRepository(UserRepository);
    const user: User = await userRepository.getById(id);
    return user ? done(null, user) : done({ status: 401, msg: 'Token is invalid.' } as IError, null);
  } catch (err) {
    return done(err);
  }
}));

passport.use('refresh-jwt', new CustomStrategy(async (req, done) => {
  const refreshToken = req.headers['x-refresh-token'] as string;
  const isValidRefreshToken = await verifyToken(refreshToken);
  if (isValidRefreshToken) {
    const userRepository = getCustomRepository(UserRepository);
    const { id } = extractUserIdFromTokem(refreshToken);
    const user: User = await userRepository.getById(id);
    return done(null, extractTransportedUser(user));
  }
  return done({ status: 401, msg: 'Refresh token is invalid.' } as IError, null);
}));
