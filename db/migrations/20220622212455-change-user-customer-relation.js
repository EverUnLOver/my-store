'use strict';
const { DataTypes } = require('sequelize');

const { CUSTOMER_TABLE } = require('../models/customer.module');
const { USER_TABLE } = require('../models/user.module');

module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'user_id',
      references: {
        model: USER_TABLE,
        key: 'id',
      },
      unique: true,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
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
