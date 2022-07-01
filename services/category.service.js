const Service = require('../utils/base.service');
const { models } = require('../libs/sequelize');

class CaregoryService extends Service {
  model = models.Category;
  includeInOne = ['products'];
}

module.exports = CaregoryService
