const Joi = require('joi');

const integer = Joi.number().integer();
const amount = integer.min(1);

const createOrderSchema = Joi.object({
  customerId: integer.required()
});

const getOrderSchema = Joi.object({
  id: integer.required(),
});

const addItemSchema = Joi.object({
  orderId: integer.required(),
  productId: integer.required(),
  amount: amount.required(),
})

module.exports = { createOrderSchema, getOrderSchema, addItemSchema };
