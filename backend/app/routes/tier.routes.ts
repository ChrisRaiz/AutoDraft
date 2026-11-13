import { Router } from "express";
const tierController = require("../controllers/tier.controller.ts");

const router = Router();

// Post a new tier entry
router.post("/create", tierController.createTier);

// Get tier by the _id property value
router.get("/read/id", tierController.findById);

// Get tier by the name property value
router.get("/read/name", tierController.findByName);

// Update tier by the _id property value
router.patch("/update/id", tierController.updateById);

// Update tier by the name property value
router.patch("/update/name", tierController.updateByName);

// Delete tier by the _id property value
router.delete("/delete/id", tierController.deleteById);

// Delete tier by the name property value
router.delete("/delete/name", tierController.deleteByName);

module.exports = router;
