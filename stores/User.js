const { Sequelize, Model, DataTypes } = require('sequelize');
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST || 'localhost';

// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = (DB_NAME) ?
  new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false
  }) : new Sequelize('sqlite::/tmp/testdb');

class User extends Model { }
User.init({
  username: DataTypes.STRING,
  data: DataTypes.JSON,
  coalition: DataTypes.JSON,
  active: DataTypes.BOOLEAN
}, { sequelize, modelName: 'user' });

async function save(user, coalition) {
  await sequelize.sync();
  const result = await User.findAll({
    where: { username: user.login }
  });
  const id = (result[0]) ? result[0].dataValues.id : null;
  const result2 = await User.upsert({ id: id, username: user.login, data: user, coalition });
  return result2;
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

async function findAll(where) {
  await sequelize.sync();
  const result = await User.findAll(where || {});
  return result;
}

module.exports = {
  save,
  findOne,
  findAll
};
