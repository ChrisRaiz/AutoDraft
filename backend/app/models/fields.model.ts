import { Schema, Connection, Model } from "mongoose";
import { FieldsType, ConditionalDocType, IFields } from "../types/schema.types";
const { documentsConn } = require("../../server");

const conditionalFieldsSchema = new Schema<ConditionalDocType>({
  path: {
    type: String,
    required: true,
    unique: true,
  },
  // @ts-ignore | Throws ts err since it's recognized as being undefined
  isApplicable: {
    type: Boolean,
    default: false,
    required: false,
  },
  evaluation: {
    type: String,
    enum: ["all", "any"],
    required: true,
  },
  staticFields: {
    type: Map,
    of: String,
    required: true,
  },
  dynamicFields: {
    type: Map,
    of: String,
    required: true,
  },
});

const fieldsSchema = new Schema<IFields>({
  document: { type: String, required: true, unique: true },
  fields: {
    form: {
      type: Map,
      of: String,
      required: true,
    },
    pre: {
      type: Map,
      of: String,
      required: false,
    },
    contact: {
      type: Map,
      of: String,
      required: false,
    },
  },
  conditionals: {
    type: Object,
    of: conditionalFieldsSchema,
    required: false,
    unique: true,
  },
});

const documentsDb: Connection = documentsConn.connection.useDb("documents_db");
const Fields: Model<IFields> = documentsDb.model("Fields", fieldsSchema);

module.exports = Fields;

// ! (OLD SCHEMA/MODEL) USES CLASSES INSTEAD OF MONGOOSE SCHEMA/MODEL
// // Any known sections of information will fit this format
// interface IStaticDocs {
//   form: StaticFieldsType;
//   pre: StaticFieldsType;
//   contact: StaticFieldsType;
// }

// // The value/field format of any of the Static Document Sections
// type StaticFieldsType = Map<number, string>;

// // Any unknown sections that are reliant on the document will fit this format
// interface IConditionalDocs {
//   [document: string]: IConditionalFields;
// }

// // The value/field format of any for any of the Conditional Document Sections
// interface IConditionalFields {
//   path: string;
//   isApplicable: boolean;
//   evaluation: "all" | "any";
//   conditions: { field: string; satisfier: string }[];
//   staticFields: Map<string, string>;
//   dynamicFields: Map<string, string>;
// }

// // The complete document fields data set
// interface IFields {
//   document: string;
//   fields: IStaticDocs;
//   conditionals: IConditionalDocs;
// }

// // Schema for Conditional Fields/Documents
// class ConditionalFields implements IConditionalFields {
//   @prop({ required: true, unique: true })
//   public path!: string;

//   @prop({ required: false, default: false })
//   public isApplicable!: boolean;

//   @prop({ required: true })
//   public evaluation!: "all" | "any";

//   @prop({ required: true })
//   public conditions!: { field: string; satisfier: string }[];

//   @prop({ required: true })
//   public staticFields!: Map<string, string>;

//   @prop({ required: true })
//   public dynamicFields!: Map<string, string>;
// }

// // Schema for the Static Fields/Documents
// class StaticFields implements IStaticDocs {
//   @prop({ required: true })
//   public form!: Map<number, string>;

//   @prop({ required: false, default: new Map() })
//   public pre!: Map<number, string>;

//   @prop({ required: false, default: new Map() })
//   public contact!: Map<number, string>;
// }

// // Schema for the complete document fields data set
// export class Fields implements IFields {
//   @prop({ required: true, unique: true })
//   public document!: string;

//   @prop({ required: true })
//   public fields!: StaticFields;

//   @prop({ required: false, unique: true })
//   public conditionals!: { [document: string]: ConditionalFields };
// }

// // Model for fields entire data set
// export const FieldsModel = getModelForClass(Fields);
