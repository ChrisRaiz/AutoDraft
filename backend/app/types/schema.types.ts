import { Schema, Decimal128, ObjectId } from "mongoose";

// Document Schemas
export interface IMetadata {
  author: string;
  team: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAccess {
  teamId: string;
  minPermissionLevel: number;
}

export interface IFile {
  name: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedAt: Date;
}

export interface ICondition {
  formField: string;
  satisfier: string[];
}

export interface IDynamicField {
  evaluation: "all" | "any";
  conditions: ICondition[];
  method: "display" | "use" | "calc";
  methodProps: ObjectId;
}

export interface ICalcMethod {
  calculation: "sum" | "difference" | "product" | "quotient" | "equation";
  formArguments: string[];
  equation: string | null;
}

export interface IDisplayMethod {
  defaultState: boolean;
  text: string;
}

export interface IUseMethod {
  defaultText: string;
  textMap: Map<string, string>;
}

export interface IDocument {
  name: string;
  metadata: IMetadata;
  access: IAccess;
  file: IFile;
  staticFields: Set<string>;
  dynamicFields: Map<string, IDynamicField>;
}

// Fields Schemas
export type FieldsType = {
  form: Map<number, string>;
  pre: Map<number, string>;
  contact: Map<number, string>;
};

export type ConditionalDocType = {
  [document: string]: {
    path: string;
    isApplicable: boolean;
    evaluation: "all" | "any";
    conditions: { field: string; satisfier: string }[];
    staticFields: Map<string, string>;
    dynamicFields: Map<string, string>;
  };
};

export interface IFields {
  document: string;
  fields: FieldsType;
  conditionals: ConditionalDocType;
}

// Team Schemas
export interface TopDocumentStat {
  documentSet: string;
  submissions: number;
  progress: number;
}

export interface RealityTargetStat {
  reality: number;
  target: number;
}

export interface DocumentGenerationStat {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
}

export interface FormTurnoverStat {
  invites: number;
  responses: number;
}

export interface SubmissionInsightStat {
  newSubmissions: number;
  updatedSubmissions: number;
  deletedSubmissions: number;
}

export interface IMember {
  id: Schema.Types.ObjectId;
  name: string;
  permissionLevel: number;
  suspended: boolean;
  joinedAt: Date;
  updatedAt: Date;
}

export interface ITeam {
  name: string;
  owner: {
    id: Schema.Types.ObjectId;
    name: string;
  };
  members: Map<Schema.Types.ObjectId, IMember>;
  package: {
    tier: {
      id: number;
      name: string;
    };
    fee: number;
    frequency: "never" | "monthly" | "annually";
    lastPayment: Date;
    nextPayment: Date | null;
  };
  usage: {
    members: {
      available: number;
      suspended: number;
      inUse: number;
    };
    sets: {
      storage: {
        available: number;
        inUse: number;
      };
      generate: {
        available: number;
        used: number;
        resetAt: Date;
      };
    };
    documents: {
      storage: {
        available: number;
        inUse: number;
      };
    };
  };
  statistics: {
    today: {
      generatedDocs: number;
      newSubmissions: number;
      submissionUpdates: number;
      deletedSubmissions: number;
      lastUpdated: Date;
      updateAt: Date;
    };
    submissionInsight: {
      months: {
        jan: SubmissionInsightStat;
        feb: SubmissionInsightStat;
        mar: SubmissionInsightStat;
        apr: SubmissionInsightStat;
        may: SubmissionInsightStat;
        jun: SubmissionInsightStat;
        jul: SubmissionInsightStat;
        aug: SubmissionInsightStat;
        sep: SubmissionInsightStat;
        oct: SubmissionInsightStat;
        nov: SubmissionInsightStat;
        dec: SubmissionInsightStat;
      };
      lastUpdated: Date;
      updateAt: Date;
    };
    formTurnover: {
      days: {
        mon: FormTurnoverStat;
        tue: FormTurnoverStat;
        wed: FormTurnoverStat;
        thu: FormTurnoverStat;
        fri: FormTurnoverStat;
        sat: FormTurnoverStat;
        sun: FormTurnoverStat;
      };
      lastUpdated: Date;
      updateAt: Date;
    };
    documentGeneration: {
      prev: DocumentGenerationStat;
      curr: DocumentGenerationStat;
      lastUpdated: Date;
      updateAt: Date;
    };
    realityTarget: {
      months: {
        jan: RealityTargetStat;
        feb: RealityTargetStat;
        mar: RealityTargetStat;
        apr: RealityTargetStat;
        may: RealityTargetStat;
        jun: RealityTargetStat;
        jul: RealityTargetStat;
        aug: RealityTargetStat;
        sep: RealityTargetStat;
        oct: RealityTargetStat;
        nov: RealityTargetStat;
        dec: RealityTargetStat;
      };
      lastUpdated: Date;
      updateAt: Date;
    };
    topDocuments: {
      docs: TopDocumentStat[];
      lastUpdated: Date;
      updateAt: Date;
    };
  };
}

// Tier Schemas
export interface ITier {
  name: string;
  fee: {
    monthly: Decimal128;
    annually: Decimal128;
  };
  limits: {
    members: {
      storage: number;
    };
    sets: {
      storage: number;
      size: number;
      generations: number;
    };
    documents: {
      storage: number;
      size: number;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

// User Schemas
export interface IUser {
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  password: string;
  teamData: {
    id: Schema.Types.ObjectId;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
