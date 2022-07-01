// const faker = require('faker');
const boom  = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class StoreService {
    constructor () {
      // this.stores = []
      // this.generate()
      // this.pool = pool;
      // this.pool.on("error", err => console.log(err ))
    }
    // generate(){
    //   for (let i = 0; i < 1000; i++) {
    //     this.stores.push({
    //       id: faker.datatype.uuid(),
    //       name: faker.company.companyName(),
    //       region: faker.address.city(),
    //       description: faker.lorem.paragraph(),
    //       logo: faker.image.imageUrl(),
    //       isBlock: faker.datatype.boolean()
    //     });
    //   }
    // }
    // async find(){
    //   const query = `SELECT * FROM tasks`;
    //   const [
    //     data,
    //     // metadata
    //   ] = await sequelize.query(query);
    //   return {
    //     data,
    //     // metadata
    //   };
    // }
    async find() {
      const rta = await models.Store.findAll();
      return rta;
    }

    // findOne(id){
    //   const store = this.stores.find(store => store.id === id)
    //   if (!store) {
    //     throw boom.notFound('Store not found');
    //   }
    //   if (store.isBlock) {
    //     throw boom.conflict('Store is block');
    //   }
    //   return store
    // }
    async findOne(id) {
      const store = await models.Store.findByPk(id);
      if (!store) {
        throw boom.notFound("Store not found");
      };
      return store;
    }
    // create(data){
    //   const newStore = {
    //     id: faker.datatype.uuid(),
    //     ...data
    //   }
    //   this.stores.push(newStore)
    //   return newStore
    // }
    async create(data) {
      const newStore = await models.Store.create(data);
      return newStore;
    }
    // update(id, changes){
    //   const index = this.stores.findIndex(item => item.id = id);
    //   if (index === -1) {
    //     throw boom.notFound('Store not found');
    //   }
    //   const product = {...this.stores[index], ...changes};
    //   this.stores[index] = product;
    //   return product;
    // }
    async update(id, changes) {
      const store = await this.findOne(id);
      const rta = store.update(changes);
      return rta;
    }
    // delete(id){
    //   const index = this.stores.findIndex(item => item.id = id);
    //   if (index === -1) {
    //     throw boom.notFound('Store not found');
    //   }
    //   this.stores.splice(index, 1);
    //   return { message: true, id };
    // }
    async delete(id) {
      const store = await this.findOne(id);
      store.destroy();
      return { id };
    }
}

module.exports = StoreService;
