const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


const UserModel = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    activity_status_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    last_name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    phonee_no: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    lateest_varification_code: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    online_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    admin_block_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    created_at: {
        type: DataTypes.TIMESTAMP,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.TIMESTAMP,
        allowNull: false
    },
    privacy: {
        type: DataTypes.TEXT,
        allowNull: false
    },

}, {
    timestamps: false
});

StatusModel.hasOne(UserModel, {
    foreignKey: "id",
})
UserModel.belongsTo(StatusModel, {
    foreignKey: "id",
})
module.exports = UserModel