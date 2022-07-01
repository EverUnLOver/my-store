'use strict';

const { CategorySchema, CATEGORY_TABLE } = require('../models/category.module')
const { ProductSchema, PRODUCT_TABLE } = require('../models/product.module')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.addColumn(PRODUCT_TABLE, 'category_id', ProductSchema.categoryId);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(CATEGORY_TABLE);
  }
};
