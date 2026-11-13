import { Request, Response } from "express";
import checkRequestBody from "../utils/checkRequestBody.util";
import mongoose, {
  Model,
  Decimal128,
  HydratedDocument,
  ObjectId,
} from "mongoose";
import { ITeam, ITier, IUser } from "../types/schema.types";
import HttpException from "../utils/httpException.util";

const Team: Model<ITeam> = require("../models/team.model");
const Tier: Model<ITier> = require("../models/tier.model");
const User: Model<IUser> = require("../models/user.model");

interface IMemberData {
  id: string;
  name: {
    first: string;
    last: string;
  };
  permissionLevel?: number;
}

type Members = Map<string, IMemberData>;

interface ITeamData {
  name: string;
  owner: {
    id: string;
    name: {
      first: string;
      last: string;
    };
  };
  members: Members;
  package: {
    tier: {
      id: ObjectId;
      name: string;
    };
    fee: Decimal128;
    frequency: "monthly" | "annually";
  };
}

interface ITeamFieldUpdates {
  name?: string;
  owner?: {
    id?: ObjectId;
    name?: {
      first?: string;
      last?: string;
    };
  };
  members?: Members;
  package?: {
    tier?: {
      id?: ObjectId;
      name?: string;
    };
    fee?: number;
    frequency?: "monthly" | "annually";
  };
}

const reqBodyRequirements: { [controller: string]: string[] } = {
  createTeam: [
    "name",
    "ownerId",
    "ownerFirstName",
    "ownerLastName",
    "packageTierId",
    "packageFrequency",
  ],
  authorize: ["teamId", "userId"],
  findById: ["id"],
  findByName: ["name"],
  checkNameAvailable: ["name"],
  updateById: ["id", "fieldUpdates"],
  updateByName: ["name", "fieldUpdates"],
  deleteById: ["id"],
  deleteByName: ["name"],
};

// Create a new team entry
exports.createTeam = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.createTeam);

  const tier: HydratedDocument<ITier> | null = await Tier.findById(
    req.body.packageTierId
  );

  if (!tier)
    throw new HttpException(
      404,
      `No tier found with the id: ${req.body.packageTierId}`
    );

  const members: Map<string, IMemberData> = new Map();
  members.set(req.body.ownerId, {
    id: req.body.ownerId,
    name: {
      first: req.body.ownerFirstName,
      last: req.body.ownerLastName,
    },
    permissionLevel: req.body?.permissionLevel || 0,
  });

  const frequency: "monthly" | "annually" =
    req.body.packageFrequency.toLowerCase();

  const teamData: ITeamData = {
    name: req.body.name,
    owner: {
      id: req.body.ownerId,
      name: {
        first: req.body.ownerFirstName,
        last: req.body.ownerLastName,
      },
    },
    members: members,
    package: {
      tier: {
        id: tier.id,
        name: tier.name,
      },
      fee: tier.fee[frequency],
      frequency: req.body.packageFrequency,
    },
  };

  const team: HydratedDocument<ITeam> = new Team(teamData);
  const savedTeam: HydratedDocument<ITeam> = await team.save();

  if (!savedTeam._id || !savedTeam.name)
    throw new HttpException(
      404,
      `Required properties "_id" and/or "name" are missing in savedTeam`
    );

  await User.findByIdAndUpdate(req.body.ownerId, {
    teamData: { id: savedTeam._id, name: savedTeam.name },
    updatedAt: new Date(),
  });

  res
    .status(201)
    .json({ message: "Successfully created a new team!", team: savedTeam });
};

// Authorize user permissions
exports.authorize = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.authorize);

  const teamId: ObjectId = req.body.teamId;
  const userId: ObjectId = req.body.userId;

  const team = await Team.findById(teamId, "-_id members");

  if (!team)
    throw new HttpException(
      404,
      `No team found with the id: ${req.body.teamId}`
    );

  const user = team.members.get(userId);

  if (!user)
    throw new HttpException(
      404,
      `No user found in team.members with the id: ${userId}`
    );

  const permissionLevel = user.permissionLevel;

  res.status(200).json({
    message: "Successfully found members permission level!",
    permissionLevel: permissionLevel,
  });
};

// Find entry by id
exports.findById = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.findById);

  const id: string = req.body.id;

  const team = await Team.findById(id);

  if (!team) throw new HttpException(404, `No team found with the id: ${id}`);

  res.status(200).json({ message: "Successfully found a team!", team: team });
};

// Find entry by name
exports.findByName = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.findByName);

  const name: string = req.body.name;

  const team = await Team.findOne({ name: name });

  if (!team)
    throw new HttpException(404, `No team found with the name: ${name}`);

  res.status(200).json({ message: "Successfully found a team!", team: team });
};

// Check if name is available
exports.checkNameAvailable = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.checkNameAvailable);

  const name: string = req.body.name.toLowerCase();

  const available: boolean = !Boolean(
    await Team.exists({
      name: name,
    })
  );

  if (!available) {
    res
      .status(200)
      .json({ available: false, message: `Team name ${name} is taken` });
  } else {
    res
      .status(200)
      .json({ available: true, message: `Team name ${name} is available!` });
  }
};

// Update entry by id
exports.updateById = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.updateById);

  const id: string = req.body.id;
  const fieldUpdates: ITeamFieldUpdates = req.body.fieldUpdates;

  const team = await Team.findByIdAndUpdate(id, fieldUpdates, {
    new: true,
  });

  if (!team) {
    throw new HttpException(404, `No team found with the id: ${id}`);
  }

  res.status(200).json({ message: "Successfully updated a team!", team: team });
};

// Update entry by name
exports.updateByName = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.updateByName);

  const name = req.body.name;
  const fieldUpdates = req.body.fieldUpdates;

  const team = await Team.findOneAndUpdate({ name: name }, fieldUpdates, {
    new: true,
  });

  if (!team)
    throw new HttpException(404, `No team found with the name: ${name}`);

  res.status(200).json({ message: "Successfully updated a team!", team: team });
};

// Delete entry by id
exports.deleteById = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.deleteById);

  const id: string = req.body.id;

  const team = await Team.findByIdAndDelete(id);

  if (!team) throw new HttpException(404, `No team found with the id: ${id}`);

  res.status(200).json({ message: "Successfully deleted a team!", team: team });
};

// Delete entry by name
exports.deleteByName = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.updateByName);

  const name: string = req.body.name;

  const team = await Team.findOneAndDelete({
    name: name,
  });

  if (!team)
    throw new HttpException(404, `No team found with the name: ${name}`);

  res.status(200).json({ message: "Successfully deleted a team!", team: team });
};
