import { Router } from "express";
const documentController = require("../controllers/document.controller.ts");

const router = Router();

// Post a new document entry
router.post("/create", documentController.createDocument);

// Get document by the _id property value
router.get("/find/document", documentController.findByName);

// Get document by the name property value
router.get("/find/id", documentController.findById);

// Update document by the _id property value
router.put("/update/document", documentController.updateByName);

// Update document by the name property value
router.put("/update/id", documentController.updateById);

// Delete document by the _id property value
router.delete("/delete/document", documentController.deleteByName);

// Delete document by the name property value
router.delete("/delete/id", documentController.deleteById);

module.exports = router;
