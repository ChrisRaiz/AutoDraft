import { Router } from "express";
const userController = require("../controllers/user.controller.ts");

const router = Router();

// Post a new user entry
router.post("/create", userController.createUser);

// Authenticate user login
router.get("/authenticate", userController.authenticate);

// Get user by the _id property value
router.get("/find/id", userController.findById);

// Get user by the email property value
router.get("/find/email", userController.findByEmail);

// Check if email is available by the email property value
router.get("/check/email", userController.checkEmailAvailable);

// Update user by the _id property value
router.patch("/update/id", userController.updateById);

// Update user by the email property value
router.patch("/update/email", userController.updateByEmail);

// Delete user by the _id property value
router.delete("/delete/id", userController.deleteById);

// Delete user by the email property value
router.delete("/delete/email", userController.deleteByEmail);

module.exports = router;
