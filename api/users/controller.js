const me = (req, res, next) => {
  try {
    res.status(200).json({
      message: 'Hello world',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  me,
};
