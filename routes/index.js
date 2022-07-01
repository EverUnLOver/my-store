const express = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const customersRouter = require('./customers.router');
const ordersRouter = require('./order.router');
const storesRouter = require('./stores.router');


function routerApp(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/orders', ordersRouter);
  router.use('/stores', storesRouter);
}

module.exports = routerApp;
