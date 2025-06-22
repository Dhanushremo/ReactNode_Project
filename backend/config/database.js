const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('react', 'root', '2327', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
