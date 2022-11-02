const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const StatusModel = require("./statusModel")
const ChatListModel = require("./chat_list_Model")

const UserModel = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    activity_status_id: {
        type: DataTypes.INTEGER,
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
    phone_no: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    latest_verification_code: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    privacy: {
        type: DataTypes.TEXT,
        allowNull: false
    },

}, {
    timestamps: false
});

// relation with StatusModel
StatusModel.hasOne(UserModel, {
    foreignKey: "id",
})
UserModel.belongsTo(StatusModel, {
    foreignKey: "id",
})


// realtion with chatListModel
ChatListModel.hasOne(UserModel, {
    foreignKey: "id",
})
UserModel.belongsTo(ChatListModel, {
    foreignKey: "id",
})


module.exports = UserModel