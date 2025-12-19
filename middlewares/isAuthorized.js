const Vehicle = require("../models/Vehicle");

const isAuthorized = async (req, res, next) => {
  if (req.isAdmin) return next();

  const routeName = req.originalUrl.split("/")[1];

  let id;

  if (routeName === "user") {
    id = req.params.id;
  } else {
    const vehicle = await Vehicle.findById(req.params.id).populate("owner");
    id = vehicle.owner._id;
  }

  const user = req.user;

  if (String(user._id) !== String(id)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

module.exports = isAuthorized;
