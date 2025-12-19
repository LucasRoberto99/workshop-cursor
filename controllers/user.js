const errorResponse = require("../services/errorResponse");
const userService = require("../services/userService");

/**
 * Controller pour créer un utilisateur
 */
const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const { avatar } = req.files;

    await userService.createUser({ username, email }, avatar);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    errorResponse(res, error);
  }
};

/**
 * Controller pour récupérer tous les utilisateurs
 */
const readUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    errorResponse(res, error);
  }
};

/**
 * Controller pour récupérer un utilisateur par son ID
 */
const readUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    errorResponse(res, error);
  }
};

/**
 * Controller pour mettre à jour un utilisateur
 */
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email } = req.body;
    const avatar = req.files?.avatar;

    await userService.updateUser(userId, { username, email }, avatar);
    res.json({ message: "User updated" });
  } catch (error) {
    errorResponse(res, error);
  }
};

/**
 * Controller pour supprimer un utilisateur
 */
const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  createUser,
  readUsers,
  readUser,
  updateUser,
  deleteUser,
};
