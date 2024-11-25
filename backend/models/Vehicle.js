const db = require("./db");

const Vehicle = db.sequelize.define(
  "vehicle",
  {
    vehicle_id: {
      type: db.Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    plate: {
      type: db.Sequelize.TEXT,
    },
    year: {
      type: db.Sequelize.INTEGER,
    },
    monthly_fee: {
      type: db.Sequelize.DECIMAL(10, 2),
    },
    fk_owner: {
      type: db.Sequelize.INTEGER,
      references: { model: "owner", key: "owner_id" },
      onDelete: "CASCADE",
      allowNull: false,
    },
  },
  { freezeTableName: true },
);

Vehicle.sync({ force: false });

module.exports = Vehicle;
