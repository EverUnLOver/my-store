const express = require('express');

const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createOrderSchema, getOrderSchema, addItemSchema } = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/',
  async (req, res, next) => {
    const rta = await service.find();
    res.json({ data: rta });
  }
);

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category)
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.delete(id);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
