const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { config } = require('../config/config');

const router = express.Router();

const jwtConfig = {
  expiresIn: '7d',
}

router.post('/login',
  checkApiKey,
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const paload = {
        sub: user.id,
        role: user.role
      }
      const token =  jwt.sign(paload, config.jwtSecret, jwtConfig)
      res.json({
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
