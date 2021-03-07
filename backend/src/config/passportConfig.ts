import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as CustomStrategy } from 'passport-custom';
import { getCustomRepository } from 'typeorm';
import { compare } from '../common/helpers/cryptoHelper';
import { IRegisterUser } from '../common/models/user/IRegisterUser';
import { secret } from './jwtConfig';
import { IJwtOptions } from '../common/models/tokens/IJwtOptions';
import { extractUserIdFromTokem, verifyToken } from '../common/helpers/tokenHelper';
import { UserRepository } from '../data/repositories/userRepository';
import { User } from '../data/entities/User';
import { extractTransportedUser } from '../common/helpers/userExtractorHelper';
import { CustomError } from '../common/models/error/CustomError';

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
        return done(new CustomError('Incorrect email.', 401), false);
      }

      return await compare(password, user.password)
        ? done(null, extractTransportedUser(user))
        : done(new CustomError('Passwords do not match.', 401), null, null);
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
          return done(new CustomError('Email is already taken.', 401));
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
    return user ? done(null, user) : done(new CustomError('Token is invalid.', 401), null);
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
  return done(new CustomError('Refresh token is invalid.', 401), null);
}));
