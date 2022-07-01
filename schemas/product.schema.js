const Joi = require('joi');

// const id = joi.string().uuid();
const integer = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const region = Joi.string().min(3).max(30);
const description = Joi.string().min(3).max(500);
const image = Joi.string().uri();
const stock = integer.min(0);
const price = Joi.number().min(10);
const isBlock = Joi.boolean();

const createProductSchema = Joi.object({
  name: name.required(),
  categoryId: integer.required(),
  region: region.required(),
  description: description,
  image: image.required(),
  price: price.required(),
  stock: stock.required(),
  isBlock: isBlock.required(),
});

const updateProductSchema = Joi.object({
  name,
  categoryId: integer,
  region,
  description,
  image,
  price,
  stock,
  isBlock,
});

const getProductSchema = Joi.object({
  id: integer.required(),
});

const queryProductSchema = Joi.object({
  limit: integer,
  // offset: integer,
  offset: integer.when('limit', {
    is: integer.required(),
    then: Joi.required()
  }),
  price,
  price_min: price,
  price_max: price
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema };
