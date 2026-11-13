import { Date, Schema, Connection, Model } from "mongoose";
import { IFile } from "../types/schema.types";

const { documentsConn } = require("../../server");

const fileSchema = new Schema<IFile>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  mimeType: { type: String },
  size: { type: Number },
  uploadedAt: { type: Date, default: Date.now },
});

const documentsDb: Connection = documentsConn.connection.useDb("documents_db");
const File: Model<IFile> = documentsDb.model("File", fileSchema);

module.exports = File;
