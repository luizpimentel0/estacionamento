const db = require("./db");
const Vehicle = require("./Vehicle");

const Owner = db.sequelize.define(
  "owner",
  {
    owner_id: {
      type: db.Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: db.Sequelize.TEXT,
    },
    cpf: {
      type: db.Sequelize.TEXT,
    },
  },
  { freezeTableName: true },
);

Vehicle.belongsTo(Owner, {
  foreignKey: "fk_owner",
});

// Owner.sync({ force: false });

module.exports = Owner;
