import { Router } from "express";
const fieldsController = require("../controllers/fields.controller.ts");

const router = Router();

router.post("/fields/create", fieldsController.createFields);

router.get("/fields/find/document/:document", fieldsController.findByDocument);

router.get("/fields/find/id/:id", fieldsController.findById);

router.put(
  "/fields/update/document/:document",
  fieldsController.updateByDocument
);

router.put("/fields/update/id/:id", fieldsController.updateById);

router.delete(
  "/fields/delete/document/:document",
  fieldsController.deleteByDocument
);

router.delete("/fields/delete/id/:id", fieldsController.deleteById);

module.exports = router;
