const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController")
const multerUploader = require("../middlewares/multerUploder")
router.route("/all").get(multerUploader.uploadUserImage, UserController.findAllUsersById);
router.route("/new").get(UserController.addNewUser);
router.route("/update:uId").get(UserController.updateUserById);
module.exports = router;