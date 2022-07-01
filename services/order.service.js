const Service = require('../utils/base.service');
const { models } = require('../libs/sequelize');

class OrderService extends Service {
  model = models.Order;
  includeInOne = [
    {
      association: 'customer',
      include: ['user']
    },
    'items'
  ];
  includeInAll = ['customer']

  async addItem(data) {
    const newItem = await models.Item.create(data);
    return newItem;
  }
}

module.exports = OrderService
