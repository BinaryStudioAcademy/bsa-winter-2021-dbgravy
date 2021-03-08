import passport from 'passport';

export default passport.authenticate('sign-up', { session: false });
