import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User, validatePassword } from '../models/model';

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    User.findOne({
        where: {
            email: email
        }
    }).then((user) => {
        if (!user) {
            return done(null, false, { message: "Username or password is invalid" });
        }

        if (validatePassword(user, password)) {
            return done(null, user);
        } else {
            return done(null, false, { message: "Username or password is invalid" });
        }
    }).catch(err => {
        return done(err, null);
    })
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findOne({
        where: {
            id: id
        }
    }).then((user) => {
        return done(null, user);
    }).catch(err => {
        return done(err, null);
    });
});

export default passport;