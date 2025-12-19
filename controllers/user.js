const User = require("../models/User");
const errorResponse = require("../services/errorResponse");
const cloudinary = require("cloudinary").v2;
const convertToBase64 = require("../utils/convertToBase64");
const uid2 = require("uid2");

const createUser = async (req, res) => {
  try {
    console.log("route");
    const { username, email } = req.body;
    const { avatar } = req.files;
    const cloudinaryResponse = await cloudinary.uploader.upload(
      convertToBase64(avatar)
    );
    const token = uid2(64);
    await User.create({
      username,
      email,
      avatar: cloudinaryResponse,
      token,
    });
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.log("tom");
    errorResponse(res, error);
  }
};

const readUsers = async (req, res) => {
  try {
    const users = await User.find().select("-token");
    res.json(users);
  } catch (error) {
    errorResponse(res, error);
  }
};

const readUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-token");
    res.json(user);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email } = req.body;
    const avatar = req.files?.avatar;
    let cloudinaryResponse;

    if (avatar) {
      cloudinaryResponse = await cloudinary.uploader.upload(
        convertToBase64(avatar)
      );
    }

    await User.findByIdAndUpdate(userId, {
      username,
      email,
      avatar: cloudinaryResponse,
    });

    res.json({ message: "User updated" });
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.json({ message: "User deleted" });
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = { createUser, readUsers, readUser, updateUser, deleteUser };
