// const faker = require('faker');
const Service = require('../utils/base.service');
const { models } = require('../libs/sequelize');

class CustomerService extends Service{
  model = models.Customer;
  includeInOne = ['user'];
  includeInAll = ['user'];
}

module.exports = CustomerService;
