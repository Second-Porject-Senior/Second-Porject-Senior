const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('realstate', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => {
    console.log("db is connected")
  })
  .catch((err) => {
    throw err;
  });

const Estate = require('../models/Estate.model')(sequelize, DataTypes)
const Category = require('../models/Categorie.model')(sequelize, DataTypes)

Category.hasMany(Estate, { foreignKey: 'category_id' })
Estate.belongsTo(Category, { foreignKey: 'category_id' })

// sequelize
//   .sync({ force: true })
//   .then(async () => {
//     console.log("Tables are being created in the correct order");
//     await Category.sync({ force: true })
//     await Estate.sync({ force: true })
//     console.log("Tables are created successfully");
//   })
//   .catch((err) => {
//     console.error("Error synchronizing tables:", err)
//   })

module.exports = { sequelize, Estate, Category };