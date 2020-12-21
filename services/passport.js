const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    UserModel.findOne({
        where: {
            email: email
        }
    }).then((user) => {
        if (!user) {
            return done(null, false, { message: "Username or password is invalid" });
        }

        if (UserModel.validatePassword(user, password)) {
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
    UserModel.findOne({
        where: {
            id: id
        }
    }).then((user) => {
        return done(null, user);
    }).catch(err => {
        return done(err, null);
    });
});

module.exports = passport;