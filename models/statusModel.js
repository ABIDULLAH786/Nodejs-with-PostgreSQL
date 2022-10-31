const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


const StatusModel = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    active_status: {
        type: DataTypes.TEXT,
        allowNull: false
    },
   

}, {
    timestamps: false
});

module.exports = StatusModel