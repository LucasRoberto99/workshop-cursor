const express = require("express");
const {
  createVehicle,
  readVehicles,
  readVehicle,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicle");
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAuthorized = require("../middlewares/isAuthorized");
const checkIfAdmin = require("../middlewares/checkIfAdmin");

const router = express.Router();

router.post("/vehicle", isAuthenticated, createVehicle);

router.get("/vehicles", readVehicles);

router.get("/vehicle/:id", readVehicle);

router.put(
  "/vehicle/:id",
  isAuthenticated,
  checkIfAdmin,
  isAuthorized,
  updateVehicle
);

router.delete(
  "/vehicle/:id",
  isAuthenticated,
  checkIfAdmin,
  isAuthorized,
  deleteVehicle
);

module.exports = router;
