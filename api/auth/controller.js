const Joi = require('@hapi/joi');

const User = require('./models/User');
const jwt = require('./jwt');

const login = async (req, res, next) => {
  const paramsSchema = Joi.object().keys({
    email: Joi.string()
      .email().min(8).max(32)
      .required(),
    password: Joi.string().required(),
  });

  const validation = Joi.validate(req.body, paramsSchema);

  if (validation.error !== null) {
    return res.status(500).json({
      errors: [{ msg: validation.error }],
    });
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    user.comparePassword(req.body.password, (err) => {
      if (err) {
        return res.status(500).json({
          errors: [{ msg: 'Invalid credentials' }],
        });
      }

      const options = {
        issuer: 'Authorization',
        subject: req.body.email,
        audience: req.body.client || 'web', // this should be provided by client
      };

      return res.status(200).json({
        error: null,
        data: {
          token: jwt.sign(JSON.stringify({
            email: req.body.email,
            password: req.body.password,
          }), options),
        },
      });
    });
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  const paramsSchema = Joi.object().keys({
    email: Joi.string()
      .email().min(8).max(32)
      .required(),
    password: Joi.string().required(),
  });

  const validation = Joi.validate(req.body, paramsSchema);

  if (validation.error !== null) {
    return res.status(500).json({
      errors: [{ msg: validation.error }],
    });
  }

  try {
    const userAlreadyExists = await User.findOne({ email: req.body.email });
    if (userAlreadyExists) {
      return res.status(500).json({
        errors: [{ msg: 'Account with that email address already exists.' }],
      });
    }

    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();

    res.status(200).json({
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  signup,
};
