'use strict';

const { DataTypes, Sequelize } = require('sequelize');

const { CATEGORY_TABLE } = require('../models/category.module');
const { PRODUCT_TABLE } = require('../models/product.module');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      }
    });
    await queryInterface.addColumn(PRODUCT_TABLE, 'category_id', {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'category_id',
      references: {
        model: CATEGORY_TABLE,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(PRODUCT_TABLE, 'category_id');
    await queryInterface.dropTable(CATEGORY_TABLE);
  }
};
