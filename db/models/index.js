const { Store, StoreSchema } = require('./store.module');
const { User, UserSchema } = require('./user.module');
const { Customer, CustomerSchema } = require('./customer.module');
const { Order, OrderSchema } = require('./order.module');
const { Item, ItemSchema } = require('./item.module');
const { Product, ProductSchema } = require('./product.module');
const { Category, CategorySchema } = require('./category.module');

function setupModels(sequelize) {
  Store.init(StoreSchema, Store.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  Item.init(ItemSchema, Item.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Order.associate(sequelize.models);
  Product.associate(sequelize.models);
  Category.associate(sequelize.models);
};

module.exports = setupModels;
