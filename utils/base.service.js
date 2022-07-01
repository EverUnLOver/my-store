const boom = require('@hapi/boom');

class Service {
  model = new Object();
  includeInOne = new Array();
  includeInAll = new Array();
  constructor(model, includeInOne, includeInAll) {
    this.model = model;
    this.includeInOne = includeInOne;
    this.includeInAll = includeInAll;
  }
  async create(data) {
    const newInstace = await this.model.create(data, {
      include: this.includeInOne
    });
    return newInstace;
  }
  async find(query={}) {
    const options = {
      include: this.includeInAll,
    }
    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
      delete query.limit;
      delete query.offset;
    }
    options.where = query
    const rta = await this.model.findAll(options);
    return rta;
  }
  async findOne(id) {
    const instance = await this.model.findByPk(id, {
      include: this.includeInOne
    });
    if (!instance) {
      throw boom.notFound(`${this.model.name} not found`);
    }
    return instance;
  }
  async update(id, changes) {
    const instance = await this.findOne(id);
    const rta = await instance.update(changes);
    return rta;
  }
  async delete(id) {
    const instance = await this.findOne(id);
    instance.destroy();
    return { id };
  }
};

module.exports = Service;
