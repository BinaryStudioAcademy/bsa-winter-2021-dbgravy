import passport from 'passport';

export default passport.authenticate('jwt-custom', { session: false });
