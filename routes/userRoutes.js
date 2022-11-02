const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController")
const multerUploader = require("../middlewares/multerUploder")

router.route("/all").get(UserController.findAllUsersById);
router.route("/:uId").get(UserController.getUserById);
router.route("/new").post(multerUploader.uploadUserImage, UserController.addNewUser);
router.route("/update/:uId").put(multerUploader.uploadUserImage, UserController.updateUserById);
router.route("/remove/:uId").delete(UserController.removeUserById);

module.exports = router;