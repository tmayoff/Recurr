import { use } from 'passport';
import LocalStrategy from 'passport-local';

use(new LocalStrategy({
    username: 'user[email]',
    password: 'user[password]'
}, (email, password, done) => {
    // TODO Find and authenticate user
    return done(null, false, { errors: { 'Not implemented': 'Authentication not implemented' } });
}));