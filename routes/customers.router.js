const express = require('express');

const CustomerService = require("./../services/cutomer.service");
const validatorHandler = require('./../middlewares/validator.handler');
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('./../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

router.get("/", async (req, res, next) => {
  const rta = await service.find();
  try {
    const { region } = req.query
    let filter = `${region ? 1 : 0}`
    switch (filter) {
      case "1":
        res.json({ data: rta.filter(store => store.region === region) })
        break;
      default:
        res.json({ data: rta })
    }
  } catch (error) {
    next(error)
  }
})

router.get("/:id",
  validatorHandler(getCustomerSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  })

router.post('/',
  validatorHandler(createCustomerSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
      res.status(201).json(newCustomer)
    } catch (error) {
      next(error);
    }
  })

router.put('/:id',
  validatorHandler(getCustomerSchema, "params"),
  validatorHandler(updateCustomerSchema, "body"),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.json({
        message: 'total update',
        data: body,
        id,
      })
    } catch (error) {
      next(error);
    }
  })

router.patch('/:id',
  validatorHandler(getCustomerSchema, "params"),
  validatorHandler(updateCustomerSchema, "body"),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.json({
        message: 'partial update',
        data: body,
        id,
      })
    } catch (error) {
      next(error);
    }
  })

router.delete('/:id',
  validatorHandler(getCustomerSchema, "params"),
  (req, res, next) => {
    try {
      const { id } = req.params;
      res.json({
        message: 'deleted',
        id,
      })
    } catch (error) {
      next(error);
    }
  })

module.exports = router;
