const { verify } = require('./jwt');

const authenticate = (req, res, next) => {
  const token = req.headers['auth-token'];
  const options = {
    issuer: 'Authorization',
    audience: req.body.client || 'web', // this should be provided by client
  };

  const payload = verify(token, options);

  if (!payload) {
    res.status(400).json({ error: 'Invalid auth token provided.' });
  }

  const { data } = payload;
  req.user = JSON.parse(data);

  next();
};

module.exports = {
  authenticate,
};
