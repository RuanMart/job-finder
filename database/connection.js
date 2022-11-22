const Sequelize = require("sequelize");

const db = new Sequelize({
	dialect: "sqlite",
	storage: "./database/app.db",
});

module.exports = db;
