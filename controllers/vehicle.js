const errorResponse = require("../services/errorResponse");
const vehicleService = require("../services/vehicleService");

/**
 * Controller pour créer un véhicule
 */
const createVehicle = async (req, res) => {
  try {
    await vehicleService.createVehicle(req.body);
    res.status(201).json({ message: "Vehicle created" });
  } catch (error) {
    errorResponse(res, error);
  }
};

/**
 * Controller pour récupérer tous les véhicules
 */
const readVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    res.json(vehicles);
  } catch (error) {
    errorResponse(res, error);
  }
};

/**
 * Controller pour récupérer un véhicule par son ID
 */
const readVehicle = async (req, res) => {
  try {
    const vehicle = await vehicleService.getVehicleById(req.params.id);
    res.json(vehicle);
  } catch (error) {
    errorResponse(res, error);
  }
};

/**
 * Controller pour mettre à jour un véhicule
 */
const updateVehicle = async (req, res) => {
  try {
    await vehicleService.updateVehicle(req.params.id, req.body);
    res.json({ message: "Vehicle updated" });
  } catch (error) {
    errorResponse(res, error);
  }
};

/**
 * Controller pour récupérer un véhicule par sa marque
 */
const getVehicleByBrand = async (req, res) => {
  try {
    const { brand } = req.params;
    const vehicle = await vehicleService.getVehicleByBrand(brand);

    if (!vehicle) {
      return res
        .status(404)
        .json({ message: "Vehicle not found with this brand" });
    }

    res.json(vehicle);
  } catch (error) {
    // Si c'est une erreur de validation, retourner 400
    if (
      error.message.includes("required") ||
      error.message.includes("Invalid")
    ) {
      return res.status(400).json({ message: error.message });
    }
    errorResponse(res, error);
  }
};

/**
 * Controller pour supprimer un véhicule
 */
const deleteVehicle = async (req, res) => {
  try {
    await vehicleService.deleteVehicle(req.params.id);
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
  getVehicleByBrand,
  deleteVehicle,
};
