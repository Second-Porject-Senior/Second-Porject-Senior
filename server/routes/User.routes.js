const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/Auth.middleware.js");
const userController = require("../controllers/User.controller.js");

const router = express.Router();

router.post("/create-user", verifyToken, isAdmin, userController.createUser);
router.get("/all-users", verifyToken, isAdmin, userController.getAllUsers);
router.get("/:id", verifyToken, isAdmin, userController.getUserById);
router.put("/:id", verifyToken, isAdmin, userController.updateUser);
router.delete("/:id", verifyToken, isAdmin, userController.deleteUser);

module.exports = router;