import passport from 'passport';

export default passport.authenticate('jwt', { session: false });

export const jwtNewPassMiddleware = passport.authenticate('new-pass', { session: false });
