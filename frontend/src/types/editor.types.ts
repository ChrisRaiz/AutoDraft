import { HTMLInputTypeAttribute } from 'react';

export interface IFilterKey {
  [filter: string]: HTMLInputTypeAttribute;
}

export interface ISectionFilters {
  [section: string]: {
    fieldTypes: { filter: string; set: 'type'; type: string }[];
    fieldData: { filter: string; set: 'data'; type: boolean }[];
    subsections?: { filter: string; set: 'subsections'; type: boolean }[];
  };
}

export interface IStatisticData {
  id: number;
  title: string;
  value: number;
  category: string;
  percentage: number;
}

export interface IFixedFormSection {
  id: number;
  section: string;
  subsections?: null;
  fieldData: IFixedFieldData[];
  filterKey: string;
}

export interface IDynamicFormSection {
  id: number;
  section: string;
  subsections: string[];
  fieldData: IDynamicFieldData;
  filterKey: string;
}

export interface IFixedFieldData {
  id: number;
  fieldId: string;
  label: string;
  element: 'input' | 'select';
  properties: {
    type: string;
  };
  format?: string;
}

export interface IDynamicFieldData {
  [subsection: string]: {
    id: number;
    fieldId: string;
    label: string;
    element: string;
    properties: {
      type: string;
    };
    format?: string;
  }[];
}
