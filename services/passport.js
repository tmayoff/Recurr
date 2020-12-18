import passport, { use, serializeUser, deserializeUser } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User, validatePassword } from '../models/models';

use(new LocalStrategy((username, password, done) => {
    User.findOne({
        where: {
            username: username
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
}
));

serializeUser((user, done) => {
    done(null, user.id);
});

deserializeUser((id, done) => {
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