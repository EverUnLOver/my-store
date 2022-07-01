'use strict';

const { ItemSchema, ITEM_TABLE } = require('../models/item.module');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ITEM_TABLE, ItemSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ITEM_TABLE);
  }
};
