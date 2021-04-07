const { Sequelize, Model, DataTypes } = require('sequelize');
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST || 'localhost';

// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = (DB_NAME) ?
  new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql'
  }) : new Sequelize('sqlite::/tmp/testdb');

class User extends Model { }
User.init({
  username: DataTypes.STRING,
  data: DataTypes.JSON
}, { sequelize, modelName: 'user' });

async function save(user) {
  await sequelize.sync();
  const result = await User.findAll({
    where: { username: user.login }
  });
  if (result.length === 0) {
    const result2 = await User.create({ username: user.login, data: user });
    console.log(result2);
    return result2;
  } else {
    throw new Error('Already registered!');
  }
}

async function findOne(username) {
  await sequelize.sync();
  const user = await User.findOne({
    where: {
      username: username
    }
  });
  return user;
}

async function findAll() {
  await sequelize.sync();
  const result = await User.findAll({});
  return result;
}

module.exports = {
  save,
  findOne,
  findAll
};