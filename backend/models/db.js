const Sequelize = require("sequelize");

const sequelize = new Sequelize("parking", "root", "root", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

module.exports = { Sequelize, sequelize };
