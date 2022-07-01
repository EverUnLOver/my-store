const express = require('express');

const UserService = require("./../services/user.service");
const validatorHandler = require('./../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/user.schema');

const router = express.Router();
const service = new UserService();

router.get("/", async (req, res) => {
  const rta = await service.find();
  const { region } = req.query
  let filter = `${region?1:0}`
  switch (filter) {
    case "1":
      res.json({ users: rta.filter(user => user.region === region) })
      break;
    default:
      res.json({ users: rta })
  }
})

router.get("/:id",
  validatorHandler(getUserSchema, 'params'),
  async (req, res) => {
    const { id }= req.params;
    const user = await service.findOne(id);
    res.json(user);
  }
)

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
}
)

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'total update',
    data: body,
    id,
  })
})

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'partial update',
    data: body,
    id,
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'deleted',
    id,
  })
})

module.exports = router;
