import { Request, Response } from "express";
import { ObjectId, HydratedDocument } from "mongoose";
import bcrypt from "bcryptjs";
import checkRequestBody from "../utils/checkRequestBody.util";
import HttpException from "../utils/httpException.util";
import { IUser } from "../types/schema.types";

const User = require("../models/user.model");

interface IUserFieldUpdates {
  name?: {
    first?: string;
    last?: string;
  };
  email?: string;
  phone?: string;
  password?: string;
  teamData?: {
    id?: ObjectId;
    name?: string;
  };
}

interface ICredentials {
  email: string;
  password: string;
}

interface IUserData {
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  password: string;
}

const reqBodyRequirements: { [controller: string]: string[] } = {
  createUser: ["firstName", "lastName", "email", "phone", "password"],
  authenticate: ["email", "password"],
  findById: ["id"],
  findByEmail: ["email"],
  checkEmailAvailable: ["email"],
  updateById: ["id", "fieldUpdates"],
  updateByEmail: ["email", "fieldUpdates"],
  deleteById: ["id"],
  deleteByEmail: ["email"],
};

// Create a new user entry
exports.createUser = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.createUser);

  const userData: IUserData = {
    name: {
      first: req.body.firstName,
      last: req.body.lastName,
    },
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  };

  const user: HydratedDocument<IUser> = new User(userData);
  const savedUser: HydratedDocument<IUser> = await user.save();

  res
    .status(201)
    .json({ message: "Successfully created a new user!", user: savedUser });
};

// Authenticate user credentials (a.k.a login)
exports.authenticate = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.authenticate);

  const inputCredentials: ICredentials = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const user: HydratedDocument<IUser> = await User.findOne({
      email: inputCredentials.email,
    });

    if (!user)
      res.status(404).json({
        message: `No user found with the email: ${inputCredentials.email}`,
      });
    //   throw new HttpException(
    //     404,
    //     `No user found with the email: ${inputCredentials.email}`
    //   );

    const passwordVerification: Boolean = await bcrypt.compare(
      inputCredentials.password,
      user.password
    );

    if (!passwordVerification) throw new HttpException(401, `Invalid Password`);

    res.status(200).json({ message: "Successfully authenticated user!" });
  } catch (err) {
    console.error("Login error:", err);
    res
      .status(500)
      .json({ message: "Internal server error during authentication" });
  }
};

// ? Does authorize permissions belong in this controller, in the teams controller, or both controllers?

// Find entry by id
exports.findById = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.findById);

  const id: string = req.body.id;

  const user: HydratedDocument<IUser> = await User.findById(id);

  if (!user) throw new HttpException(404, `No user found with the id: ${id}`);

  res.status(200).json({ message: "Successfully found a user!", user: user });
};

// Find entry by email
exports.findByEmail = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.findByEmail);

  const email: string = req.body.email;

  const user: HydratedDocument<IUser> = await User.findOne({ email: email });

  if (!user)
    throw new HttpException(404, `No user found with the email: ${email}`);

  res.status(200).json({ message: "Successfully found a user!", user: user });
};

// Check if email is available
exports.checkEmailAvailable = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.checkEmailAvailable);

  const email: string = req.body.email;

  const available: boolean = !Boolean(
    await User.exists({
      email: email,
    })
  );

  if (!available) {
    res
      .status(200)
      .json({ available: false, message: `Email ${email} is taken` });
  } else {
    res
      .status(200)
      .json({ available: true, message: `Email ${email} is available!` });
  }
};

// Update entry by id
exports.updateById = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.updateById);

  const id: string = req.body.id;
  const fieldUpdates: IUserFieldUpdates = req.body.fieldUpdates;

  const updatedUser: HydratedDocument<IUser> = await User.findByIdAndUpdate(
    id,
    fieldUpdates,
    {
      new: true,
    }
  );

  if (!updatedUser) {
    throw new HttpException(404, `No user found with the id: ${id}`);
  }

  res
    .status(200)
    .json({ message: "Successfully updated a user!", user: updatedUser });
};

// Update entry by email
exports.updateByEmail = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.updateByEmail);

  const email: string = req.body.email;
  const fieldUpdates: IUserFieldUpdates = req.body.fieldUpdates;

  const updatedUser: HydratedDocument<IUser> = await User.findOneAndUpdate(
    { email: email },
    fieldUpdates,
    { new: true }
  );

  if (!updatedUser)
    throw new HttpException(404, `No user found with the email: ${email}`);

  res
    .status(200)
    .json({ message: "Successfully updated a user!", user: updatedUser });
};

// Delete entry by id
exports.deleteById = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.deleteById);

  const id: string = req.body.id;

  const deletedUser: HydratedDocument<IUser> = await User.findByIdAndDelete(id);

  if (!deletedUser)
    throw new HttpException(404, `No user found with the id: ${id}`);

  res
    .status(200)
    .json({ message: "Successfully deleted a user!", user: deletedUser });
};

// Delete entry by email
exports.deleteByEmail = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.deleteByEmail);

  const email: string = req.body.email;

  const deletedUser: HydratedDocument<IUser> = await User.findOneAndDelete({
    email: email,
  });

  if (!deletedUser)
    throw new HttpException(404, `No user found with the email: ${email}`);

  res
    .status(200)
    .json({ message: "Successfully deleted a user!", user: deletedUser });
};
