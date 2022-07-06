// const faker = require('faker');
const boom  = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class UserService {
    // constructor () {
    //   // this.users = []
    //   // this.generate()
    //   // this.pool = pool;
    //   // this.pool.on("error", err => console.log(err ))
    // }
    // generate(){
    //   for (let i = 0; i < 1000; i++) {
    //     this.users.push({
    //       id: faker.datatype.uuid(),
    //       name: faker.name.findName(),
    //       region: faker.address.city(),
    //       description: faker.lorem.paragraph(),
    //       image: faker.image.imageUrl(),
    //       isBlock: faker.datatype.boolean()
    //     });
    //   }
    // }
    // create(data){
    //   const newUser = {
    //     id: faker.datatype.uuid(),
    //     ...data
    //   }
    //   this.users.push(newUser)
    //   return newUser
    // }
    async create(data) {
      const newUser = await models.User.create(data);
      delete newUser.dataValues.password;
      return newUser;
    }
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
      const rta = await models.User.findAll({
        include: ['customer']
      });
      return rta;
    }
    async findByEmail(email) {
      const rta = await models.User.findOne({
        include: ['customer'],
        where: { email },
      });
      return rta;
    }
    // findOne(id){
    //   const user = this.users.find(item => item.id === id)
    //   if (!user) {
    //     throw boom.notFound('User not found');
    //   }
    //   if (user.isBlock) {
    //     throw boom.conflict('User is block');
    //   }
    //   return user
    // }
    async findOne(id) {
      const user = await models.User.findByPk(id);
      if (!user) {
        throw boom.notFound("User not found")
      };
      return user;
    }
    // update(id, changes){
    //   const index = this.users.findIndex(item => item.id = id);
    //   if (index === -1) {
    //     throw boom.notFound('User not found');
    //   }
    //   const product = {...this.users[index], ...changes};
    //   this.users[index] = product;
    //   return product;
    // }
    async update(id, changes) {
      const user = await this.findOne(id);
      const rta = await user.update(changes);
      return rta;
    }
    // delete(id){
    //   const index = this.users.findIndex(item => item.id = id);
    //   if (index === -1) {
    //     throw boom.notFound('User not found');
    //   }
    //   this.users.splice(index, 1);
    //   return { message: true, id };
    // }
    async delete(id) {
      const user = await this.findOne(id);
      user.destroy();
      return { id };
    }
}

module.exports = UserService;
