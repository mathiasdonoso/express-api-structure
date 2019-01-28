/* eslint-disable no-shadow */
const User = require('./models/User');
const jwt = require('./services/jwt');

const login = async (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    res.status(500).json({
      errors,
    });
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    user.comparePassword(req.body.password, (err) => {
      if (err) {
        res.status(500).json({
          errors: [{ msg: 'Invalid credentials' }],
        });
      }

      const options = {
        issuer: 'Authorization',
        subject: req.body.email,
        audience: req.body.client || 'web', // this should be provided by client
      };

      res.status(200).json({
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
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 6 characters long').len({ min: 6 });
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    res.status(500).json({
      errors,
    });
  }

  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });
    const userAlreadyExists = await User.findOne({ email: req.body.email });
    if (userAlreadyExists) {
      res.status(500).json({
        errors: [{ msg: 'Account with that email address already exists.' }],
      });
    } else {
      await user.save();
    }

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
