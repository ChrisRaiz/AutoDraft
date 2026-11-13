export interface IJotformFetchSubmission {
  responseCode: number;
  message: string;
  content: [
    {
      id: string;
      form_id: string;
      ip: string;
      created_at: string;
      status: string;
      new: string;
      flag: string;
      notes: string;
      updated_at: string;
      answers: {
        [qid: string]: { [property: string]: string };
      };
    },
  ];
  duration: string;
  info: null | string;
  resultSet: {
    offset: number;
    limit: number;
    filter?: {
      [selector: string]: '6138223629771756588';
    };
    count: number;
  };
  'limit-left': number;
}

export interface IDocumentFetchFields {
  $__: {
    activePaths: {
      paths: { [key: string]: string };
      states: {
        require: { [key: string]: boolean };
        init: { [key: string]: boolean };
      };
    };
    skipId: boolean;
    selected: {
      fields: number;
    };
    exclude: boolean;
  };
  $isNew: boolean;
  _doc: {
    fields: { [key: string]: Map<string, string> };
    _id: {
      buffer: { [key: string]: number };
    };
    conditionals: {
      [document: string]: {
        path: string;
        isApplicable: boolean;
        evaluation: 'all' | 'any';
        conditions: { field: string; satisfier: string }[];
        staticFields: Map<string, string>;
        dynamicFields: Map<string, string>;
      };
    };
  };
}

export interface IFillableFields {
  fields: { [key: string]: Map<string, string> };
  _id: {
    buffer: {
      [key: string]: number;
    };
  };
  conditionals: {
    [document: string]: {
      path: string;
      isApplicable: boolean;
      evaluation: 'all' | 'any';
      conditions: { field: string; satisfier: string }[];
      staticFields: Map<string, string>;
      dynamicFields: Map<string, string>;
    };
  };
}

export interface IDetectDocumentPatches {
  conditional: string;
  staticData: Map<string, ''>;
  dynamicData: Map<string, ''>;
}

export type TSubmissionCache = Map<
  string,
  {
    fields: Map<string, string>;
    conditionals: {
      [document: string]: {
        path: string;
        conditions: { field: string; satisfier: string }[];
        staticFields: Map<string, string>;
        dynamicFields: Map<string, string>;
      };
    };
  }
>;
