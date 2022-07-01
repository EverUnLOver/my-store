const { Model, DataTypes, Sequelize } = require('sequelize');

const { ORDER_TABLE } = require('./order.module');
const { PRODUCT_TABLE } = require('./product.module');

const ITEM_TABLE = 'items';

const ItemSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  orderId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'order_id',
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  productId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'product_id',
    references: {
      model: PRODUCT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
};

class Item extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: ITEM_TABLE,
      modelName: 'Item',
      timestamps: false
    }
  }
}

module.exports = { Item, ItemSchema, ITEM_TABLE };
