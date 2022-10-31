const { Sequelize, DataTypes } = require("sequelize");

try {
    var sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.HOST,
        dialect: "mysql",
        logging: true //it allow us to send sql query response to client side
    });
} catch (error) {
    console.log(error)
}



try {
    sequelize.authenticate().then(() => console.log('DATABASE Connection has been established successfully.'));
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;