// const faker = require('faker');
const Service = require('../utils/base.service');
const { models } = require('../libs/sequelize');

class ProductService extends Service{
  model = models.Product;
  includeInOne = ['category'];
  includeInAll = ['category'];
}

module.exports = ProductService;
