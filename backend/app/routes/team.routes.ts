import { Router } from "express";
const teamController = require("../controllers/team.controller.ts");

const router = Router();

// Post a new team entry
router.post("/create", teamController.createTeam);

// Authorize team permissions
router.get("/authorize", teamController.authorize);

// Get team by the _id property value
router.get("/find/id", teamController.findById);

// Get team by the name property value
router.get("/find/name", teamController.findByName);

// Check if name is available by the name property value
router.get("/check/name", teamController.checkNameAvailable);

// Update team by the _id property value
router.patch("/update/id", teamController.updateById);

// Update team by the name property value
router.patch("/update/name", teamController.updateByName);

// Delete team by the _id property value
router.delete("/delete/id", teamController.deleteById);

// Delete team by the name property value
router.delete("/delete/name", teamController.deleteByName);

module.exports = router;
