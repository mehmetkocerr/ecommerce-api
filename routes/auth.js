const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const auth = require("../middlewares/verifyToken");

router.route("/me").get(auth, UserController.UserFind);

router.route("/register").post(UserController.UserRegister);

router.route("/login").post(UserController.UserLogin);

router.route("/logout").post(UserController.UserLogout);

router.route("/token").post(UserController.Token);

module.exports = router;
