'use strict';

const { DataTypes, Sequelize } = require('sequelize');

const { ORDER_TABLE } = require('../models/order.module');
const { PRODUCT_TABLE } = require('../models/product.module');
const { ITEM_TABLE } = require('../models/item.module');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ITEM_TABLE, {
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
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ITEM_TABLE);
  }
};
