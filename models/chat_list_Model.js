const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


const ChatListModel = sequelize.define('chat_list', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    chat_room: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        default: Date.now(),
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        default: "",
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: false,
        default: "",
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: "false",
    },


}, {
    timestamps: false
});

module.exports = ChatListModel