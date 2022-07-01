const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(3).max(15);
const region = joi.string().min(3).max(30);
const description = joi.string().min(3).max(30);
const logo = joi.string().uri();
const isBlock = joi.boolean();

const createStoreSchema = joi.object({
  name: name.required(),
  region: region.required(),
  description: description,
  logo: logo.required(),
  isBlock: isBlock.required(),
});

const updateStoreSchema = joi.object({
  name,
  region,
  description,
  logo,
  isBlock,
});

const getStoreSchema = joi.object({
  id: id.required(),
});

module.exports = { createStoreSchema, updateStoreSchema, getStoreSchema };
