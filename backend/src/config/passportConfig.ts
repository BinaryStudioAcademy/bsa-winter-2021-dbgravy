import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy, VerifiedCallback } from 'passport-jwt';
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
import { ErrorCode } from '../common/enums/ErrorCode';
import { RefreshTokenRepository } from '../data/repositories/refreshTokenRepository';

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
        throw new CustomError('Incorrect email.', 401);
      }

      const compareResult = await compare(password, user.password);
      if (compareResult) {
        return done(null, extractTransportedUser(user));
      }
      throw new CustomError('Passwords do not match.', 401);
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  'sign-up',
  new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' },
    async ({ body: { email, firstName, lastName, currentOrganizationId } },
      _username, password, done): Promise<void> => {
      try {
        const userRepository = getCustomRepository(UserRepository);
        const userByEmail: User = await userRepository.getByEmail(email);
        if (userByEmail) {
          throw new CustomError('Email is already taken.', 401, ErrorCode.UserAlreadyExists);
        }
        return currentOrganizationId
          ? done(null, { email, password, firstName, lastName, currentOrganizationId } as IRegisterUser)
          : done(null, { email, password, firstName, lastName } as IRegisterUser);
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
    if (!user) {
      throw new CustomError('Token is invalid.', 401);
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.use('refresh-jwt', new CustomStrategy(async (req, done) => {
  try {
    const { refreshToken } = req.body;
    const isValidRefreshToken = await verifyToken(refreshToken);
    if (isValidRefreshToken) {
      const userRepository = getCustomRepository(UserRepository);
      const { id } = extractUserIdFromTokem(refreshToken);
      const user: User = await userRepository.getById(id);
      return done(null, extractTransportedUser(user));
    }
    await getCustomRepository(RefreshTokenRepository).deleteToken(refreshToken);
    throw new CustomError('Refresh token is invalid.', 401);
  } catch (err) {
    return done(err);
  }
}));

const validateUser = async (id: string, done: VerifiedCallback) => {
  try {
    const user = await getCustomRepository(UserRepository).getById(id);
    return user ? done(null, user) : done({ status: 401, message: 'Token is invalid.' }, null);
  } catch (err) {
    return done(err);
  }
};

const options2 = {
  jwtFromRequest: ExtractJwt.fromBodyField('token'),
  secretOrKey: secret
};

passport.use('new-pass', new JwtStrategy(options2, async ({ id }: { id: string }, done) => (
  validateUser(id, done)
)));
