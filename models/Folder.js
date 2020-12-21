const { Sequelize, Model } = require('sequelize');
const sequelize = require('../services/sequelize');

const RecurrModel = require('./Recurr');

class FolderModel extends Model { }
FolderModel.init({
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name: Sequelize.STRING,
    normalized_name: Sequelize.STRING,
}, {
    sequelize,
    modelName: "folders"
});

FolderModel.hasMany(RecurrModel);
RecurrModel.belongsTo(FolderModel);
// sequelize.sync({ alter: true });

module.exports = FolderModel;