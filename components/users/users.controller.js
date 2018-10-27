const User = require('./user');

const hello = (req, res) => {
  const user = new User('Mathías');
  res.status(200).json({
    message: user.greet(),
  });
};

module.exports = {
  hello,
};
