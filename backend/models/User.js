const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  studentName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  rollNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
  branch: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: true }
}, {
  tableName: 'users'
});

module.exports = User;
