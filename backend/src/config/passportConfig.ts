import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
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
import UserOrganizationRepository from '../data/repositories/userOrganizationRepositry';
import { OrganizationStatus } from '../common/enums/OrganizationStatus';

const options: IJwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

passport.use(
  'sign-in',
  new LocalStrategy({ passReqToCallback: true, usernameField: 'email' },
    async ({ body: { currentOrganizationId } }, email, password, done): Promise<void> => {
      try {
        const userRepository = getCustomRepository(UserRepository);
        const user: User = await userRepository.getByEmail(email);
        if (!user) {
          throw new CustomError('Incorrect email.', 401);
        }

        const compareResult = await compare(password, user.password);
        if (!compareResult) {
          throw new CustomError('Passwords do not match.', 401);
        }
        if (currentOrganizationId) {
          await userRepository.updateCurrentOrganizationId(user.id, currentOrganizationId);
          await getCustomRepository(UserOrganizationRepository).updateUserOrganization({
            userId: user.id,
            organizationId: currentOrganizationId,
            status: OrganizationStatus.ACTIVE
          });
        }
        return done(null, extractTransportedUser(user));
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
        // TODO if currentOrganizationId set currentOrganizationId and status: OrganizationStatus.ACTIVE
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
    throw new CustomError('Refresh token is invalid.', 401);
  } catch (err) {
    return done(err);
  }
}));
