const { Sequelize, Model } = require('sequelize');
const sequelize = require('../services/sequelize');

class RecurrModel extends Model { }
RecurrModel.init({
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name: Sequelize.STRING,
    normalized_name: Sequelize.STRING,
    dueday: Sequelize.INTEGER,
    duedate: Sequelize.DATEONLY,
    price: Sequelize.DOUBLE,
    cycletype: Sequelize.STRING,
    paused: Sequelize.BOOLEAN
}, {
    sequelize,
    modelName: 'recurring_payments'
});

module.exports = RecurrModel;
