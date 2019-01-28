const me = (req, res, next) => {
  res.status(200).json({
    message: 'Hello world',
  });
};

module.exports = {
  me,
};
