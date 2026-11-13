import { Decimal128 } from "mongodb";
import { Schema, Connection, Model } from "mongoose";
import { ITier } from "../types/schema.types";
const { metadataConn } = require("../../server");

const tierSchema = new Schema<ITier>({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },
  fee: {
    monthly: { type: Decimal128, required: true },
    annually: { type: Decimal128, required: true },
  },
  limits: {
    members: {
      storage: { type: Number, required: true },
    },
    sets: {
      storage: { type: Number, required: true },
      size: { type: Number, required: true },
      generations: { type: Number, required: true },
    },
    documents: {
      storage: { type: Number, required: true },
      size: { type: Number, required: true },
    },
  },
});

const metadataDb: Connection = metadataConn.connection.useDb("metadata");
const Tier: Model<ITier> = metadataDb.model("Tier", tierSchema);

module.exports = Tier;
