const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "stylecart_db",
    "root",
    "",
    {
        host: "localhost",
        dialect: "mysql",
        logging: false
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("MySQL Database Connected Successfully!");

        await sequelize.sync();
        console.log("Database Tables Synchronized Successfully!");
    } catch (error) {
        console.error("Database Connection Failed:", error.message);
    }
};

module.exports = { sequelize, connectDB };