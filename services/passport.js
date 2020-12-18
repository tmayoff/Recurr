import passport from 'passport';
import LocalStrategy from 'passport-local';

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
}, (email, password, done) => {
    // TODO Find and authenticate user
    return done(null, false, { errors: { 'Not implemented': 'Authentication not implemented' } });
}));