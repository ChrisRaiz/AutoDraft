// import mongoose, {
//   Schema,
//   model,
//   connect,
//   disconnect,
//   createConnection,
//   ConnectOptions,
//   Connection,
//   Mongoose,
//   Cursor,
// } from 'mongoose';
// import { getFormQuestions } from '@/data/connections/jotform';
// import dotenv from 'dotenv';

// type FieldsType = {
//   form: Map<number, string>;
//   pre: Map<number, string>;
//   contact: Map<number, string>;
// };

// type ConditionalDocType = {
//   [document: string]: {
//     path: string;
//     isApplicable: boolean;
//     evaluation: 'all' | 'any';
//     conditions: { field: string; satisfier: string }[];
//     staticFields: Map<string, string>;
//     dynamicFields: Map<string, string>;
//   };
// };

// interface IFields {
//   document: string;
//   fields: FieldsType;
//   conditionals: ConditionalDocType;
// }

// const conditionalFieldsSchema = new Schema<ConditionalDocType>({
//   path: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   // @ts-ignore | Throws ts err since it's recognized as being undefined
//   isApplicable: {
//     type: Boolean,
//     default: false,
//     required: false,
//   },
//   evaluation: {
//     type: String,
//     enum: ['all', 'any'],
//     required: true,
//   },
//   staticFields: {
//     type: Map,
//     of: String,
//     required: true,
//   },
//   dynamicFields: {
//     type: Map,
//     of: String,
//     required: true,
//   },
// });

// const fieldsSchema = new Schema<IFields>({
//   document: { type: String, required: true, unique: true },
//   fields: {
//     form: {
//       type: Map,
//       of: String,
//       required: true,
//     },
//     pre: {
//       type: Map,
//       of: String,
//       required: false,
//     },
//     contact: {
//       type: Map,
//       of: String,
//       required: false,
//     },
//   },
//   conditionals: {
//     type: Object,
//     of: conditionalFieldsSchema,
//     required: false,
//     unique: true,
//   },
// });

// const Fields = model<IFields>('Fields', fieldsSchema);

// mongoose.connection.on('connected', () =>
//   console.log('Mongoose connection opened'),
// );
// mongoose.connection.on('close', () =>
//   console.log('Mongoose connection closed'),
// );

// // ? Open a connection to the database
// export async function run() {
//   dotenv.config();

//   if (!process.env.MONGODB_ATLAS_URI)
//     throw new Error(
//       'An error occurred during openConnection() in db.ts, failed to connect to the database. Environment variable "MONGODB_ATLAS_URI" is undefined, please define the variable in the root directories .env file with the databases URI and try again.',
//     );

//   await connect(process.env.MONGODB_ATLAS_URI);
// }

// // ? POST document fields to the fields table in documents_db
// export async function postDocumentFields(
//   docName: string,
//   docFields: { [section: string]: Map<string, string> },
//   docConditionals: ConditionalDocType,
// ) {
//   console.log('DOC FIELDS:', docFields);
//   try {
//     const fields = new Fields({
//       document: docName,
//       fields: docFields,
//       conditionals: docConditionals,
//     });
//     await fields.save();
//   } catch (err) {
//     throw new Error(
//       `An error occurred while posting ${docName} document fields, ${err}`,
//     );
//   }
// }

// // ? FETCH document fields from fields table in documents_db
// export async function getDocumentFields(docName: string) {
//   try {
//     const docFields = await Fields.findOne(
//       { document: docName },
//       'fields conditionals',
//     );
//     console.log('getDocumentFields - docFields:', docFields);
//     return docFields;
//   } catch (err) {
//     throw new Error(
//       `An error occurred while fetching ${docName} document fields, ${err}`,
//     );
//   }
// }

// export default run();
