const { Sequelize } = require("sequelize");

const DB_URI = process.env.DB_URI;

const sequelize = new Sequelize(DB_URI, {
    dialectOptions: {
        charset: "utf8",
        multipleStatements: true,
        connectTimeout: 900000
    },
    "pool": {
        max: 60,
        min: 1,
        acquire: 900000,
        idle: 900000,
        maxIdleTime: 900000
    },
    logging: false,
});

module.exports = sequelize;