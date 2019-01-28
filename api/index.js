const router = require('express').Router();
const auth = require('./auth');
const users = require('./users');
const { name, description, version } = require('./../package.json');

router.get('/', (req, res) => {
  res.json({ version, name, description });
});

router.use('/auth', auth);
router.use('/users', users);

module.exports = router;
