import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import checkRequestBody from "../utils/checkRequestBody.util";
import HttpException from "../utils/httpException.util";
import { ITier } from "../types/schema.types";

const Tier = require("../models/tier.model");

interface ITierFieldUpdates {
  name?: string;
  fee?: {
    monthly?: number;
    annually?: number;
  };
  limits?: {
    members?: {
      storage?: number;
    };
    sets?: {
      storage?: number;
      size?: number;
      generations?: number;
    };
    documents?: {
      storage?: number;
      size?: number;
    };
  };
}

interface ITierData {
  name: string;
  fee: {
    monthly: string | number;
    annually: string | number;
  };
  limits: {
    members: {
      storage: string | number;
    };
    sets: {
      storage: string | number;
      size: string | number;
      generations: string | number;
    };
    documents: {
      storage: string | number;
      size: string | number;
    };
  };
}

const reqBodyRequirements: { [controller: string]: string[] } = {
  createTier: [
    "name",
    "feeMonthly",
    "feeAnnually",
    "memberStorageLimit",
    "setStorageLimit",
    "setSizeLimit",
    "setGenerationLimit",
    "documentStorageLimit",
    "documentSizeLimit",
  ],
  findById: ["id"],
  findByName: ["name"],
  updateById: ["id", "fieldUpdates"],
  updateByName: ["name", "fieldUpdates"],
  deleteById: ["id"],
  deleteByName: ["name"],
};

// Create a new tier entry
exports.createTier = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.createTier);

  const tierData: ITierData = {
    name: req.body.name,
    fee: {
      monthly: Number(req.body.feeMonthly),
      annually: Number(req.body.feeAnnually),
    },
    limits: {
      members: {
        storage: Number(req.body.memberStorageLimit),
      },
      sets: {
        storage: Number(req.body.setStorageLimit),
        size: Number(req.body.setSizeLimit),
        generations: Number(req.body.setGenerationLimit),
      },
      documents: {
        storage: Number(req.body.documentStorageLimit),
        size: Number(req.body.documentSizeLimit),
      },
    },
  };

  const tier: HydratedDocument<ITier> = new Tier(tierData);
  const savedTier: HydratedDocument<ITier> = await tier.save();

  res
    .status(201)
    .json({ message: "Successfully created a new tier!", tier: savedTier });
};

// Find entry by id
exports.findById = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.findById);

  const id: string = req.body.id;

  const tier: HydratedDocument<ITier> | null = await Tier.findById(id);

  if (!tier) throw new HttpException(404, `No tier found with the id: ${id}`);

  res.status(200).json({ message: "Successfully found a tier!", tier: tier });
};

// Find entry by name
exports.findByName = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.findByName);

  const name: string = req.body.name.toLowerCase();

  const tier: HydratedDocument<ITier> | null = await Tier.findOne({
    name: name,
  });

  if (!tier)
    throw new HttpException(404, `No tier found with the name: ${name}`);

  res.status(200).json({ message: "Successfully found a tier!", tier: tier });
};

// Update entry by id
exports.updateById = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.updateById);

  const id: string = req.body.id;
  const fieldUpdates: ITierFieldUpdates = req.body.fieldUpdates;

  const tier: HydratedDocument<ITier> | null = await Tier.findByIdAndUpdate(
    id,
    fieldUpdates,
    {
      new: true,
    }
  );

  if (!tier) throw new HttpException(404, `No tier found with the id: ${id}`);

  res.status(200).json({ message: "Successfully updated a tier!", tier: tier });
};

// Update entry by name
exports.updateByName = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.updateByName);

  const name: string = req.body.name;
  const fieldUpdates: ITierFieldUpdates = req.body.fieldUpdates;

  const tier: HydratedDocument<ITier> | null = await Tier.findOneAndUpdate(
    { name: name },
    fieldUpdates,
    {
      new: true,
    }
  );

  if (!tier)
    throw new HttpException(404, `No tier found with the name: ${name}`);

  res.status(200).json({ message: "Successfully updated a tier!", tier: tier });
};

// Delete entry by id
exports.deleteById = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.deleteById);

  const id: string = req.body.id;

  const tier: HydratedDocument<ITier> | null = await Tier.findByIdAndDelete(id);

  if (!tier) throw new HttpException(404, `No tier found with the id: ${id}`);

  res.status(200).json({ message: "Successfully deleted a tier!", tier: tier });
};

// Delete entry by email
exports.deleteByName = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.deleteByName);

  const name: string = req.body.name;
  const tier: HydratedDocument<ITier> | null = await Tier.findOneAndDelete({
    name: name,
  });

  if (!tier)
    throw new HttpException(404, `No tier found with the name: ${name}`);

  res.status(200).json({ message: "Successfully deleted a tier!", tier: tier });
};
