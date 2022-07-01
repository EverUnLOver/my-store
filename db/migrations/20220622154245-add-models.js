'use strict';

const { ProductSchema, PRODUCT_TABLE } = require('../models/product.module');
const { StoreSchema, STORE_TABLE } = require('../models/store.module');
const { UserSchema, USER_TABLE } = require('../models/user.module');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(STORE_TABLE, StoreSchema);

    await queryInterface.addColumn(USER_TABLE, 'name', UserSchema.name);
    await queryInterface.addColumn(USER_TABLE, 'region', UserSchema.region);
    await queryInterface.addColumn(USER_TABLE, 'description', UserSchema.description);
    await queryInterface.addColumn(USER_TABLE, 'image', UserSchema.image);
    await queryInterface.addColumn(USER_TABLE, 'is_block', UserSchema.isBlock);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(STORE_TABLE);

    await queryInterface.removeColumn(USER_TABLE, 'name');
    await queryInterface.removeColumn(USER_TABLE, 'region');
    await queryInterface.removeColumn(USER_TABLE, 'description');
    await queryInterface.removeColumn(USER_TABLE, 'image');
    await queryInterface.removeColumn(USER_TABLE, 'is_block');
  }
};
