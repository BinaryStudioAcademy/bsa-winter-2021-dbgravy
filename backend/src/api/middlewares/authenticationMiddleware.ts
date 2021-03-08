import passport from 'passport';

export default passport.authenticate('sign-in', { session: false });
