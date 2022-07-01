const { Model, DataTypes, Sequelize } = require('sequelize');

const STORE_TABLE = 'stores';

const StoreSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    aallowNull: false,
    type: DataTypes.STRING,
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
  logo: {
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

class Store extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: STORE_TABLE,
      modelName: 'Store',
      timestamps: false
    }
  }
};

module.exports = { STORE_TABLE, StoreSchema, Store };
