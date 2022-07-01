'use strict';
const { DataTypes } = require('sequelize')

const { CustomerSchema, CUSTOMER_TABLE } = require('../models/customer.module')

module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'user_id',
      unique: true
    })
  },

  async down (queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
