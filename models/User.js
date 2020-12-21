const { Sequelize, Model } = require('sequelize');
const { randomBytes, pbkdf2Sync } = require('crypto');
const sequelize = require('../services/sequelize');

const FolderModel = require('./Folder');
const RecurrModel = require('./Recurr');

class UserModel extends Model { }
UserModel.init({
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

UserModel.hashPassword = function (password) {
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
 * @param {UserModel} user The user to validate
 * @param {string} password The password to validate 
 */
UserModel.validatePassword = function (user, password) {
    let hash = pbkdf2Sync(password, user.salt, user.iterations, 32, 'sha512').toString('hex');
    return user.hash == hash;
}

UserModel.hasMany(RecurrModel);
UserModel.hasMany(FolderModel);

module.exports = UserModel;