const hello = (req, res) => {
  res.status(200).json({
    message: 'Hello world',
  });
};

module.exports = {
  hello,
};
