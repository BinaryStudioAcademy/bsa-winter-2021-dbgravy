import passport from 'passport';

export default passport.authenticate('refresh-jwt', { session: false });
