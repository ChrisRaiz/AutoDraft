import { Request, Response } from "express";
import checkRequestBody from "../utils/checkRequestBody.util";
import HttpException from "../utils/httpException.util";
import { ObjectId } from "mongoose";
import { ICalcMethod, IDisplayMethod, IUseMethod } from "../types/schema.types";

const Document = require("../models/document.model");

interface IDocumentFieldUpdates {
  name?: string;
  metadata?: {
    author?: string;
    team?: string;
  };
  access?: {
    teamId?: ObjectId;
    minPermissionLevel?: number;
  };
  file?: {
    name?: string;
    mimeType?: string;
    size?: number;
    url?: string;
  };
  staticFields?: Map<string, string>;
  dynamicFields?: Map<
    string,
    {
      evaluation: "all" | "any";
      conditions: { formField: string; satisfier: string[] }[];
      method: "display" | "use" | "calc";
      methodProps: ICalcMethod | IDisplayMethod | IUseMethod;
    }
  >;
}

const reqBodyRequirements: { [controller: string]: string[] } = {
  createDocument: [
    "name",
    "metadataAuthor",
    "metadataTeam",
    "accessTeamId",
    "accessMinPermissionLevel",
    "fileName",
    "fileMimeType",
    "fileSize",
    "fileUrl",
    "staticFields",
  ],
  findById: ["id"],
  findByName: ["name"],
  updateById: ["id", "fieldUpdates"],
  updateByName: ["name", "fieldUpdates"],
  deleteById: ["id"],
  deleteByName: ["name"],
};

const methodRequirements: { [method: string]: { [property: string]: any } } = {
  calc: {
    calculation: new Set([
      "sum",
      "difference",
      "product",
      "quotient",
      "equation",
    ]),
    formArguments: [""],
    equation: "",
  },
  display: {
    defaultState: Boolean(),
    text: "",
  },
  use: {
    defaultText: "",
    textMap: new Map<string, string>(),
  },
};

async function validateDynamicMethod(method: string, props: any) {
  if (method == "display") {
    for (const prop in props) {
      switch (prop) {
        case "defaultState":
          if (typeof props[prop] === "boolean") continue;
          throw new HttpException(
            400,
            `Invalid property: ${method}.${props[prop]}`
          );
        case "text":
          if (typeof props[prop] === "string") continue;
          throw new HttpException(
            400,
            `Invalid property: ${method}.${props[prop]}`
          );
        default:
          throw new HttpException(
            400,
            `Invalid property: ${props[prop]}, property does not exist for ${method} method`
          );
      }
    }
  } else if (method == "use") {
    for (const prop in props) {
      switch (prop) {
        case "defaultText":
          if (typeof props[prop] === "string") continue;
          throw new HttpException(
            400,
            `Invalid property: ${method}.${props[prop]}, defaultText case`
          );
        case "textMap":
          if (typeof props[prop] === "object") continue;
          throw new HttpException(
            400,
            `Invalid property: ${method}.${props[prop]}, text case`
          );
        default:
          throw new HttpException(
            400,
            `Invalid property: ${props[prop]}, default case`
          );
      }
    }
  } else if (method == "calc") {
    for (const prop in props) {
      switch (prop) {
        case "calculation":
          if (methodRequirements.calc[prop].has(props[prop])) continue;
          throw new HttpException(
            400,
            `Invalid property: ${method}.${props[prop]}`
          );

        case "formArguments":
          if (
            props[prop].constructor == Array &&
            props[prop].every((i: any) => typeof i === "string")
          )
            continue;
          throw new HttpException(
            400,
            `Invalid property: ${method}.${props[prop]}`
          );

        case "equation":
          if (typeof props[prop] === "string") continue;
          throw new HttpException(
            400,
            `Invalid property: ${method}.${props[prop]}`
          );

        default:
          throw new HttpException(
            400,
            `Invalid property: ${props[prop]}, property does not exist for ${method} method`
          );
      }
    }
  }
}

// Create a new document entry
exports.createDocument = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.createDocument);

  // Validates property data types in dynamicFields
  if (req.body?.dynamicFields) {
    const map: {
      [key: string]: {
        evaluation: "all" | "any";
        conditions: { formField: string; satisfier: string[] }[];
        method: "display" | "use" | "calc";
        methodProps: ICalcMethod | IDisplayMethod | IUseMethod;
      };
    } = req.body.dynamicFields;

    Object.values(map).forEach(async (properties) => {
      await validateDynamicMethod(properties.method, properties.methodProps);
    });
  }
  // ! File properties will be the response from the r2 cloudflare POST

  // Temporary placeholder file properties
  const fileName = req.body.fileName || "placeholderFileName";
  const fileMimeType =
    req.body.fileMimeType ||
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  const fileSize = req.body.fileSize || 255000;
  const fileUrl = req.body.fileUrl || "placeholder/r2/path";

  const documentData = {
    name: req.body.name,
    metadata: {
      author: req.body.metadataAuthor,
      team: req.body.metadataTeam,
    },
    access: {
      teamId: req.body.accessTeamId,
      minPermissionLevel: req.body.accessMinPermissionLevel,
    },
    file: {
      name: fileName,
      mimeType: fileMimeType,
      size: fileSize,
      url: fileUrl,
    },
    staticFields: req.body.staticFields,
    dynamicFields: req.body.dynamicFields,
  };

  const document = new Document(documentData);
  const savedDocument = await document.save();

  res.status(201).json({
    message: "Successfully created a new document!",
    document: savedDocument,
  });
};

// Find entry by id
exports.findById = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.findById);

  const id: string = req.body.id;

  const document = await Document.findById(id);

  if (!document)
    throw new HttpException(404, `No document found with the id: ${id}`);

  res.status(200).json({
    message: "Successfully found a document!",
    document: document,
  });
};

// Find entry by name
exports.findByName = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.findByName);

  const name: string = req.body.name;

  const document = await Document.findOne({
    name: name,
  });

  if (!document)
    throw new HttpException(404, `No document found with the name: ${name}`);

  res.status(200).json({
    message: "Successfully found a document!",
    document: document,
  });
};

// Update entry by id
exports.updateById = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.updateById);

  const id: string = req.body.id;
  const fieldUpdates: IDocumentFieldUpdates = req.body.fieldUpdates;

  const document = await Document.findByIdAndUpdate(id, fieldUpdates, {
    new: true,
  });

  if (!document)
    throw new HttpException(404, `No document found with the id: ${id}`);

  res.status(200).json({
    message: "Successfully updated a document!",
    document: document,
  });
};

// Update entry by name
exports.updateByName = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.updateByDocument);

  const name: string = req.body.name;
  const fieldUpdates: IDocumentFieldUpdates = req.body.fieldUpdates;

  const document = await Document.findOneAndUpdate(
    { name: name },
    fieldUpdates,
    { new: true }
  );

  if (!document)
    throw new HttpException(404, `No document found with the name: ${name}`);

  res.status(200).json({
    message: "Successfully updated a document!",
    document: document,
  });
};

// Delete entry by id
exports.deleteById = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.deleteById);

  const id: string = req.body.id;

  const document = await Document.findByIdAndDelete(id);

  if (!document)
    throw new HttpException(404, `No document found with the id: ${id}`);

  res.status(200).json({
    message: "Successfully deleted a document!",
    document: document,
  });
};

// Delete entry by name
exports.deleteByName = async (req: Request, res: Response) => {
  await checkRequestBody(req.body, reqBodyRequirements.deleteByDocument);

  const name: string = req.body.name;

  const document = await Document.findOneAndDelete({
    name: name,
  });

  if (!document)
    throw new HttpException(404, `No document found with the name: ${name}`);

  res.status(200).json({
    message: "Successfully deleted a document!",
    document: document,
  });
};
