import axios from "axios";
import { generateHmacSignature } from "../utils/hmac.util";
import { Request, Response } from "express";

const File = require("../models/file.model");

require("dotenv").config();

const R2_WORKER_UPLOAD_URL = process.env.R2_WORKER_URL
  ? `${process.env.R2_WORKER_URL}/putFile`
  : null;

exports.uploadFile = async (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded." });
  } else if (!R2_WORKER_UPLOAD_URL) {
    return res.status(500).json({
      error: "R2_WORKER_URL environmental variable possibly undefined.",
    });
  }

  const filename = file.originalname;
  const timestamp = Date.now().toString();

  const secret = process.env.R2_WORKER_SECRET!;
  const dataToSign = `${filename}:${timestamp}`;
  const signature = generateHmacSignature(dataToSign, secret);

  const formData = new FormData();
  formData.append("file", file.buffer, filename);

  try {
    const response = await axios.post(R2_WORKER_UPLOAD_URL, formData, {
      headers: {
        "X-Filename": filename,
        "X-Timestamp": timestamp,
        "X-Signature": signature,
        "Content-Type": file.mimetype,
        "Content-Length": file.size.toString(),
      },
    });

    const fileUrl = response.data.url; // R2 Worker should return the file URL

    // Save file metadata in MongoDB
    const savedFile = await File.create({
      filename: file.originalname,
      url: fileUrl,
      mimetype: file.mimetype,
      size: file.size,
    });

    res.status(201).json({ message: "Upload successful", file: savedFile });
  } catch (error: any) {
    console.error("Upload to R2 Worker failed:", error.message);
    res.status(500).json({ error: "Failed to upload document to R2" });
  }
};
