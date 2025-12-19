const isAdmin = (req, res, next) => {
  req.isAdmin = req.user.token === process.env.ADMIN_TOKEN;

  next();
};

module.exports = isAdmin;
