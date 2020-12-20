const { Sequelize, Model } = require('sequelize');
const { randomBytes, pbkdf2Sync } = require('crypto');
const sequelize = require('../services/sequelize');

const FolderModel = require('./Folders');
const RecurrModel = require('./Recurr');

// ---- Users ----- //
class User extends Model { }
User.init({
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    email: Sequelize.STRING,
    verified: Sequelize.BOOLEAN,
    hash: Sequelize.STRING(512),
    salt: Sequelize.STRING(512),
    iterations: Sequelize.INTEGER,
    valid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: "user"
});

function hashPassword(password) {
    var salt = randomBytes(128).toString('hex');
    var iterations = 10000;
    var hash = pbkdf2Sync(password, salt, iterations, 32, 'sha512').toString('hex');

    return {
        hash,
        salt,
        iterations
    };
}

/**
 * 
 * @param {User} user The user to validate
 * @param {string} password The password to validate 
 */
function validatePassword(user, password) {
    let hash = pbkdf2Sync(password, user.salt, user.iterations, 32, 'sha512').toString('hex');
    return user.hash == hash;
}

User.hasMany(RecurrModel);
User.hasMany(FolderModel);

sequelize.sync({ alter: true });

module.exports.User = User;
module.exports.hashPassword = hashPassword;
module.exports.validatePassword = validatePassword;