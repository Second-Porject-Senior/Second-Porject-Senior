const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('realstate', 'postgres', 'root', {
  host: 'localhost',
  dialect:'postgres' 
});
sequelize
  .authenticate()
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => {
    throw err;
  });

const db = {}
// sequelize
//   .sync({ force: true })
//   .then(() => console.log("tables are created"))
//   .catch((err) => {
//     throw err;
//   });

module.exports = db