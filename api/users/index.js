const router = require('express').Router();
const controller = require('./controller');

router.get('/', controller.hello);

module.exports = router;
