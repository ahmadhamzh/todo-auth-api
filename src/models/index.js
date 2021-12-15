
'use strict';

require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize');
const todoModel = require('./todolist/todolist');
const userModel = require('./user/user');



const DATABASE_URL = process.env.DATABASE_URL;
console.log(DATABASE_URL);

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};



const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);
const todo = todoModel(sequelize, DataTypes)
const user = userModel(sequelize, DataTypes)


module.exports = {
  db: sequelize,
  todo,
  user
}