const { Model, DataTypes, Sequelize } = require('sequelize');

const bcrypt = require('bcrypt');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  region: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: ''
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: ''
  },
  isBlock: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'is_block',
    defaultValue: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
      hooks: {
        beforeCreate: async (user, options) => {
          const password = await bcrypt.hash(user.password, 10);
          user.password = password;
        }
      },
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }
