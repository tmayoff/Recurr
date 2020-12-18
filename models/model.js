import { Sequelize, Model, Datatypes } from 'sequelize';
import { randomBytes, pbkdf2Sync } from 'crypto';
import sequelize from '../services/sequelize';

var months = ["Jan.", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var days = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."]

/**
 * 
 * @param {Date} date The date to format
 * @param {Boolean} useTime add the time to format as well
 * @param {Boolean} twelveHour Use 12-hour format or not
 */
function formateDate(date, useTime, twelveHour) {
    let dayOfWeek = days[date.getDay()];
    let dayOfMonth = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    let format = dayOfWeek + "" + month + ", " + dayOfMonth + ", " + year
    if (useTime) {
        let hours = date.getHours();
        if (twelveHour && hours > 12) {
            hours -= 12;
        }

        let minutes = ("0" + date.getMinutes()).slice(-2);
        format += " at " + hours + ":" + minutes;
    }

    return format
}

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

sequelize.sync({ alter: true });

export { User, hashPassword, validatePassword };