const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(3).max(15);
const email = joi.string().email();
const password = joi.string().min(8);
const role = joi.string().min(5);
const region = joi.string().min(3).max(30);
const description = joi.string().min(3).max(30);
const image = joi.string().uri();
const isBlock = joi.boolean();

const createUserSchema = joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  role: role.required(),
  region: region.required(),
  description: description,
  image: image.required(),
  isBlock: isBlock.required(),
});

const updateUserSchema = joi.object({
  name,
  email,
  password,
  role,
  region,
  description,
  image,
  isBlock,
});

const getUserSchema = joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
