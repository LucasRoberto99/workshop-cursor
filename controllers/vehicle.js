const errorResponse = require("../services/errorResponse");
const Vehicle = require("../models/Vehicle");

const createVehicle = async (req, res) => {
  try {
    const { kind, color, brand, owner } = req.body;
    await Vehicle.create({
      kind,
      color,
      brand,
      owner,
    });
    res.status(201).json({ message: "Vehicle created" });
  } catch (error) {
    errorResponse(res, error);
  }
};

const readVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    errorResponse(res, error);
  }
};

const readVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    res.json(vehicle);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const { kind, color, brand } = req.body;
    await Vehicle.findByIdAndUpdate(vehicleId, {
      kind,
      color,
      brand,
    });
    res.json({ message: "Vehicle updated" });
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: "Vehicle deleted" });
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  createVehicle,
  readVehicles,
  readVehicle,
  updateVehicle,
  deleteVehicle,
};
