const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const convertToBase64 = require("../utils/convertToBase64");
const uid2 = require("uid2");

/**
 * Upload une image sur Cloudinary
 * @param {Object} file - Le fichier à uploader
 * @returns {Promise<Object>} La réponse de Cloudinary
 */
const uploadAvatar = async (file) => {
  const cloudinaryResponse = await cloudinary.uploader.upload(
    convertToBase64(file)
  );
  return cloudinaryResponse;
};

/**
 * Génère un token unique pour l'utilisateur
 * @returns {string} Le token généré
 */
const generateToken = () => {
  return uid2(64);
};

/**
 * Crée un nouvel utilisateur
 * @param {Object} userData - Les données de l'utilisateur (username, email)
 * @param {Object} avatarFile - Le fichier avatar
 * @returns {Promise<Object>} L'utilisateur créé
 */
const createUser = async (userData, avatarFile) => {
  const { username, email } = userData;
  const cloudinaryResponse = await uploadAvatar(avatarFile);
  const token = generateToken();

  console.log(cloudinaryResponse);

  const user = await User.create({
    username,
    email,
    avatar: cloudinaryResponse,
    token,
  });

  return user;
};

/**
 * Récupère tous les utilisateurs (sans le token)
 * @returns {Promise<Array>} Liste de tous les utilisateurs
 */
const getAllUsers = async () => {
  const users = await User.find().select("-token");
  return users;
};

/**
 * Récupère un utilisateur par son ID (sans le token)
 * @param {string} userId - L'ID de l'utilisateur
 * @returns {Promise<Object>} L'utilisateur trouvé
 */
const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-token");
  return user;
};

/**
 * Met à jour un utilisateur
 * @param {string} userId - L'ID de l'utilisateur
 * @param {Object} updateData - Les données à mettre à jour (username, email)
 * @param {Object} avatarFile - Le nouveau fichier avatar (optionnel)
 * @returns {Promise<Object>} L'utilisateur mis à jour
 */
const updateUser = async (userId, updateData, avatarFile = null) => {
  const { username, email } = updateData;
  const updateFields = {
    username,
    email,
  };

  if (avatarFile) {
    const cloudinaryResponse = await uploadAvatar(avatarFile);
    updateFields.avatar = cloudinaryResponse;
  }

  const user = await User.findByIdAndUpdate(userId, updateFields, {
    new: true,
  });

  return user;
};

/**
 * Supprime un utilisateur par son ID
 * @param {string} userId - L'ID de l'utilisateur à supprimer
 * @returns {Promise<Object>} L'utilisateur supprimé
 */
const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
