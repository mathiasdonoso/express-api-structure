const router = require('express').Router();
const controller = require('./controller');
const { authenticate } = require('./../auth/middlewares');

router.get('/me', authenticate, controller.me);

module.exports = router;
