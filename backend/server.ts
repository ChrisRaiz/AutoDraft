import { Mongoose, Connection } from "mongoose";
import { Application } from "express";
const errorHandler = require("./app/utils/errorHandler.util");
const express = require("express");
const cors = require("cors");

// Primary connection used for write operations
const metadataConn = new Mongoose();
const documentsConn = new Mongoose();
const usersConn = new Mongoose();

// Database configs
const configs = require("./app/config/db.config");

// Connect to MongoDB
const run = async (): Promise<Application> => {
  if (!configs.PORT)
    throw new Error(
      'An error occurred during run() in server.ts, failed to connect to the database. Environment variables may be undefined at "./env" or db configs may be configured wrong at "./app/config/db.config.ts", please check the .env and db.config.ts file configurations then try again.'
    );

  const app: Application = express();
  // Use the cors middleware to enable Cross-Origin Resource Sharing
  app.use(cors());

  app.use(express.json());

  try {
    // Documents database connection
    await require("./app/connections/db.primary")(
      documentsConn,
      "Documents",
      configs.URI.USERS,
      configs.CONN_OPTIONS
    );

    // Users database connection
    await require("./app/connections/db.primary")(
      usersConn,
      "Users",
      configs.URI.DOCUMENTS,
      configs.CONN_OPTIONS
    );

    // Metadata database connection
    await require("./app/connections/db.primary")(
      metadataConn,
      "Metadata",
      configs.URI.METADATA,
      configs.CONN_OPTIONS
    );

    // Routes
    const documentRoutes = require("./app/routes/document.routes.ts");
    app.use("/api/document", documentRoutes);

    const fieldsRoutes = require("./app/routes/fields.routes.ts");
    app.use("/api/field", fieldsRoutes);

    const r2Routes = require("./app/routes/r2.routes.ts");
    app.use("/api/r2", r2Routes);

    const userRoutes = require("./app/routes/user.routes");
    app.use("/api/user", userRoutes);

    const teamRoutes = require("./app/routes/team.routes");
    app.use("/api/team", teamRoutes);

    const tierRoutes = require("./app/routes/tier.routes");
    app.use("/api/tier", tierRoutes);

    app.use(errorHandler);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  return app;
};

run().then((app) =>
  app.listen(configs.PORT, () => {
    console.log(`Server started on port ${configs.PORT}`);
  })
);

module.exports = {
  metadataConn,
  documentsConn,
  usersConn,
};

// ! OLD INIT CODE
// import express, { Request, Response } from 'express';
// import { Fields, FieldsModel } from './app/models/fields.model';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// const app = express();

// app.use(express.json());

// app.get('/', (req: Request, res: Response): Response => {
//   return res.json({ message: 'Typegoose Example 🤟' });
// });

// // app.get('/fields', async (req: Request, res: Response): Promise<Response> => {
// //   const allFields: Fields[] = await FieldsModel.find();
// //   return res.status(200).json(allFields);
// // });

// mongoose.connection.on('connected', () =>
//   console.log('Mongoose connection opened')
// );

// mongoose.connection.on('close', () =>
//   console.log('Mongoose connection closed')
// );

// const run = async (): Promise<void> => {
//   dotenv.config();

//   if (!process.env.MONGODB_ATLAS_URI)
//     throw new Error(
//       'An error occurred during run() in server.ts, failed to connect to the database. Environment variable 'MONGODB_ATLAS_URI' is undefined, please define the variable in the root directories .env file with the databases URI and try again.'
//     );

//   try {
//     await mongoose.connect(
//       `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.lndpq.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority&appName=${process.env.MONGODB_APP}`
//     );
//     app.listen(3000, () => {
//       console.log('Server started on port 3000');
//     });
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// void run();
