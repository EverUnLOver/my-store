const Joi = require('joi');

const id = Joi.number();
const name = Joi.string();
const image = Joi.string();

const createCategorySchema = Joi.object({
  name: name.required(),
  image: image.required(),
})

const updateCategorySchema = Joi.object({
  name,
  image,
})

const getCategorySchema = Joi.object({
  id: id.required(),
})


module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema }
