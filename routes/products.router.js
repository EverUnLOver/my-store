const express = require('express');
const { Op } = require('sequelize')

const ProductService = require("./../services/product.service");
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductService();

router.get("/",
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    let query = req.query;
    const { price_min, price_max } = query
    if (price_min && price_max) {
      delete query.price_min;
      delete query.price_max;
      query.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      }
    } else if (price_min) {
      delete query.price_min;
      query.price = {
        [Op.gte]: price_min
      }
    } else if (price_max) {
      delete query.price_max;
      query.price = {
        [Op.lte]: price_max
      }
    }
    const rta = await service.find(query);
    res.json(rta);
    try {
      // const { category, region, stock } = req.query
      // let filter = `${category ? 1 : 0}${region ? 1 : 0}${stock ? 1 : 0}`
      // switch (filter) {
      //   case "000":
      //     res.json({ data: rta })
      //     break;
      //   case "001":
      //     res.json({ data: rta.filter(product => product.stock >= stock) })
      //     break;
      //   case "010":
      //     res.json({ data: rta.filter(product => product.region === region) })
      //     break;
      //   case "011":
      //     res.json({ data: rta.filter(product => product.region === region && product.stock >= stock) })
      //     break;
      //   case "100":
      //     res.json({ data: rta.filter(product => product.category === category) })
      //     break;
      //   case "101":
      //     res.json({ data: rta.filter(product => product.category === category && product.stock >= stock) })
      //     break;
      //   case "110":
      //     res.json({ data: rta.filter(product => product.category === category && product.region === region) })
      //     break;
      //   case "111":
      //     res.json({ data: rta.filter(product => product.category === category && product.region === region && product.stock >= stock) })
      //     break;
      //   default:
      //     res.json({ data: rta })
      // }
    } catch (error) {
      next(error)
    }
  }
);

router.get("/:id",
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  })

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct)
    } catch (error) {
      next(error);
    }
  })

router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedProduct = await service.update(id, body);
      res.json(updatedProduct)
    } catch (error) {
      next(error);
    }
  })

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedProduct = await service.update(id, body);
    res.json(updatedProduct)
  } catch (error) {
    next(error);
  }
})

router.delete('/:id',
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await service.delete(id))
    } catch (error) {
      next(error);
    }
  })

module.exports = router;
