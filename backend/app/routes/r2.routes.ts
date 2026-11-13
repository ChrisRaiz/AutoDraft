import { Router } from "express";
import multer from "multer";
const r2Controller = require("../controllers/r2.controller.ts");

const router = Router();
const upload = multer(); // default: stores file in memory

router.post("/r2/upload", upload.single("file"), r2Controller.uploadFile);

module.exports = router;
