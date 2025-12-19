const express = require("express");
const {
  createUser,
  readUsers,
  readUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const fileUpload = require("express-fileupload");
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAuthorized = require("../middlewares/isAuthorized");
const checkIfAdmin = require("../middlewares/checkIfAdmin");

const router = express.Router();

router.post("/user", fileUpload(), createUser);

router.get("/users", readUsers);

router.get("/user/:id", readUser);

router.put(
  "/user/:id",
  isAuthenticated,
  checkIfAdmin,
  isAuthorized,
  fileUpload(),
  updateUser
);

router.delete(
  "/user/:id",
  isAuthenticated,
  checkIfAdmin,
  isAuthorized,
  deleteUser
);

module.exports = router;
