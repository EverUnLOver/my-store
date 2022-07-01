const express = require('express');

const StoreService = require("./../services/store.service");
const validatorHandler = require('./../middlewares/validator.handler');
const { createStoreSchema, updateStoreSchema, getStoreSchema } = require('./../schemas/store.schema');

const router = express.Router();
const service = new StoreService();

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
  validatorHandler(getStoreSchema, "params"),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const store = service.findOne(id);
      res.json(store);
    } catch (error) {
      next(error);
    }
  })

router.post('/',
  validatorHandler(createStoreSchema, "body"),
  (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json({
        message: 'created',
        data: body
      })
    } catch (error) {
      next(error);
    }
  })

router.put('/:id',
  validatorHandler(getStoreSchema, "params"),
  validatorHandler(updateStoreSchema, "body"),
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
  validatorHandler(getStoreSchema, "params"),
  validatorHandler(updateStoreSchema, "body"),
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
  validatorHandler(getStoreSchema, "params"),
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
