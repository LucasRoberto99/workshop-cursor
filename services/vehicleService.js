const Vehicle = require("../models/Vehicle");

/**
 * Crée un nouveau véhicule en base de données
 * @param {Object} vehicleData - Les données du véhicule (kind, color, brand, owner)
 * @returns {Promise<Object>} Le véhicule créé
 */
const createVehicle = async (vehicleData) => {
  const { kind, color, brand, owner } = vehicleData;
  const vehicle = await Vehicle.create({
    kind,
    color,
    brand,
    owner,
  });
  return vehicle;
};

/**
 * Récupère tous les véhicules
 * @returns {Promise<Array>} Liste de tous les véhicules
 */
const getAllVehicles = async () => {
  const vehicles = await Vehicle.find();
  return vehicles;
};

/**
 * Récupère un véhicule par son ID
 * @param {string} vehicleId - L'ID du véhicule
 * @returns {Promise<Object>} Le véhicule trouvé
 */
const getVehicleById = async (vehicleId) => {
  const vehicle = await Vehicle.findById(vehicleId);
  return vehicle;
};

/**
 * Met à jour un véhicule
 * @param {string} vehicleId - L'ID du véhicule
 * @param {Object} updateData - Les données à mettre à jour
 * @returns {Promise<Object>} Le véhicule mis à jour
 */
const updateVehicle = async (vehicleId, updateData) => {
  const { kind, color, brand } = updateData;
  const vehicle = await Vehicle.findByIdAndUpdate(
    vehicleId,
    { kind, color, brand },
    { new: true }
  );
  return vehicle;
};

/**
 * Nettoie et valide le paramètre brand
 * @param {string} brand - La marque à valider
 * @returns {Object} { isValid, sanitized, error }
 */
const validateAndSanitizeBrand = (brand) => {
  if (!brand || typeof brand !== "string" || !brand.trim()) {
    return {
      isValid: false,
      error: "Brand parameter is required and must be a non-empty string.",
    };
  }

  const sanitizedBrand = brand.replace(/[^\w\s\-]/gi, "").trim();

  if (sanitizedBrand.length === 0) {
    return {
      isValid: false,
      error: "Invalid brand parameter after sanitization.",
    };
  }

  return {
    isValid: true,
    sanitized: sanitizedBrand,
  };
};

/**
 * Récupère un véhicule par sa marque (recherche insensible à la casse)
 * @param {string} brand - La marque du véhicule
 * @returns {Promise<Object>} Le véhicule trouvé ou null
 */
const getVehicleByBrand = async (brand) => {
  const validation = validateAndSanitizeBrand(brand);

  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  const vehicle = await Vehicle.findOne({
    brand: { $regex: `^${validation.sanitized}$`, $options: "i" },
  });

  return vehicle;
};

/**
 * Supprime un véhicule par son ID
 * @param {string} vehicleId - L'ID du véhicule à supprimer
 * @returns {Promise<Object>} Le véhicule supprimé
 */
const deleteVehicle = async (vehicleId) => {
  const vehicle = await Vehicle.findByIdAndDelete(vehicleId);
  return vehicle;
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  getVehicleByBrand,
  deleteVehicle,
};
