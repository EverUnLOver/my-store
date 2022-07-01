'use strict';

const { DataTypes } = require('sequelize');

const { CUSTOMER_TABLE } = require('../models/customer.module');
const { USER_TABLE } = require('../models/user.module');

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(CUSTOMER_TABLE, 'user_id', {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'user_id',
      references: {
        model: USER_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(CUSTOMER_TABLE, 'user_id');
  }
};
