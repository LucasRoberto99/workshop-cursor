const errorResponse = (res, error) => {
  res.status(500).json({ message: error.message });
};

module.exports = errorResponse;
