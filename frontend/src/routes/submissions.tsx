import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as NewSetIcon } from './../data/assets/new-set-icon-10x10.svg';
import { ReactComponent as SearchIcon } from './../data/assets/search-icon-14x15.svg';
import { ReactComponent as ReturnIcon } from './../data/assets/return-icon-12x11.svg';
import styles from './submissions.module.css';
import ClientList from '@/components/ClientList';

interface ISubmissionList {
  id: number;
  submissionId: string;
  submissionDate: string;
  allFieldsFilled: string;
  conditionals: string;
}

interface IClientList {
  id: number;
  clientId: string;
  client: string;
  lastSubmission: string;
  submissions: string;
  email: string;
  phone: string;
  submissionData: ISubmissionList[];
}

interface IStatisticData {
  id: number;
  title: string;
  value: number;
  category: string;
  percentage: number;
}

interface IFormSection {
  id: number;
  section: string;
  subsections?: string[];
  fieldData: IFixedFieldData[] | IDynamicFieldData;
}

interface IFixedFieldData {
  id: number;
  fieldId: string;
  label: string;
  element: string;
  properties: {
    type: string;
  };
  format?: string;
}

interface IDynamicFieldData {
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

interface IColors {
  color: string;
  light: string;
  dark: string;
}

const clientListData: IClientList[] = [
  {
    id: 0,
    clientId: '01',
    client: 'Avery Collins',
    lastSubmission: '12/02/2024',
    submissions: '4',
    email: 'avery.collins@example.com',
    phone: '(630) 555-2938',
    submissionData: [
      {
        id: 0,
        submissionId: '04',
        submissionDate: '11/24/2024',
        allFieldsFilled: 'True',
        conditionals: 'True',
      },
      {
        id: 1,
        submissionId: '03',
        submissionDate: '11/24/2024',
        allFieldsFilled: 'True',
        conditionals: 'True',
      },
      {
        id: 2,
        submissionId: '02',
        submissionDate: '11/08/2024',
        allFieldsFilled: 'True',
        conditionals: 'False',
      },
      {
        id: 3,
        submissionId: '01',
        submissionDate: '10/20/2024',
        allFieldsFilled: 'False',
        conditionals: 'False',
      },
    ],
  },
  {
    id: 1,
    clientId: '02',
    client: 'Maya Thornton',
    lastSubmission: '01/24/2025',
    submissions: '1',
    email: 'maya.thornton@example.com',
    phone: '(682) 555-7920',
    submissionData: [
      {
        id: 0,
        submissionId: '01',
        submissionDate: '01/24/2025',
        allFieldsFilled: 'True',
        conditionals: 'True',
      },
    ],
  },
  {
    id: 2,
    clientId: '03',
    client: 'Jordan Ellis',
    lastSubmission: '11/15/2024',
    submissions: '3',
    email: 'jordan.ellis@example.com',
    phone: '(584) 555-3892',
    submissionData: [],
  },
  {
    id: 3,
    clientId: '04',
    client: 'Priya Nair',
    lastSubmission: '02/03/2025',
    submissions: '2',
    email: 'priya.nair@example.com',
    phone: '(630) 555-4093',
    submissionData: [],
  },
  {
    id: 4,
    clientId: '05',
    client: 'Marcus Webb',
    lastSubmission: '08/04/2024',
    submissions: '6',
    email: 'marcus.webb@example.com',
    phone: '(776) 555-7392',
    submissionData: [],
  },
  {
    id: 5,
    clientId: '06',
    client: 'Theo Barrett',
    lastSubmission: '03/01/2025',
    submissions: '1',
    email: 'theo.barrett@example.com',
    phone: '(902) 555-2890',
    submissionData: [],
  },
  {
    id: 6,
    clientId: '07',
    client: 'Elena Ruiz',
    lastSubmission: '01/29/2025',
    submissions: '2',
    email: 'elena.ruiz@example.com',
    phone: '(284) 555-9538',
    submissionData: [],
  },
  {
    id: 7,
    clientId: '08',
    client: 'Samuel Okafor',
    lastSubmission: '11/05/2024',
    submissions: '12',
    email: 'samuel.okafor@example.com',
    phone: '(932) 555-9283',
    submissionData: [],
  },
  {
    id: 8,
    clientId: '09',
    client: 'Grace Holloway',
    lastSubmission: '02/12/2024',
    submissions: '3',
    email: 'grace.holloway@example.com',
    phone: '(483) 555-2843',
    submissionData: [],
  },
  {
    id: 9,
    clientId: '10',
    client: 'Nadia Petrov',
    lastSubmission: '12/02/2023',
    submissions: '1',
    email: 'nadia.petrov@example.com',
    phone: '(943) 555-5938',
    submissionData: [],
  },
];

const statisticCardData: IStatisticData[] = [
  {
    id: 0,
    title: 'Contact Information',
    value: 4,
    category: 'Fields Filled',
    percentage: 100,
  },
  {
    id: 1,
    title: 'Pre-Form Information',
    value: 7,
    category: 'Fields Filled',
    percentage: 88,
  },
  {
    id: 2,
    title: 'Will Form',
    value: 52,
    category: 'Fields Filled',
    percentage: 68,
  },
  {
    id: 3,
    title: 'Form Errors',
    value: 25,
    category: 'Errors',
    percentage: 28,
  },
];

const contactInformationData: IFixedFieldData[] = [
  {
    id: 0,
    fieldId: 'contact-firstName',
    label: 'First Name',
    element: 'input',
    properties: {
      type: 'text',
    },
  },
  {
    id: 1,
    fieldId: 'contact-lastName',
    label: 'Last Name',
    element: 'input',
    properties: {
      type: 'text',
    },
  },
  {
    id: 2,
    fieldId: 'contact-streetAddress',
    label: 'Street Address',
    element: 'input',
    properties: {
      type: 'text',
    },
  },
  {
    id: 3,
    fieldId: 'contact-streetAddress2',
    label: 'Street Address 2',
    element: 'input',
    properties: {
      type: 'text',
    },
  },
  {
    id: 4,
    fieldId: 'contact-suiteApartmentNumber',
    label: 'Suite/Apartment Number',
    element: 'input',
    properties: {
      type: 'text',
    },
  },
  {
    id: 5,
    fieldId: 'contact-city',
    label: 'City',
    element: 'input',
    properties: {
      type: 'text',
    },
  },
  {
    id: 6,
    fieldId: 'contact-stateProvinceRegion',
    label: 'State/Province/Region',
    element: 'input',
    properties: {
      type: 'text',
    },
  },
  {
    id: 7,
    fieldId: 'contact-postalZipCode',
    label: 'Postal/Zip Code',
    element: 'input',
    properties: {
      type: 'text',
    },
  },
  {
    id: 8,
    fieldId: 'contact-country',
    label: 'Country',
    element: 'input',
    properties: {
      type: 'text',
    },
  },
  {
    id: 9,
    fieldId: 'contact-email',
    label: 'Email',
    element: 'input',
    properties: {
      type: 'email',
    },
  },
  {
    id: 10,
    fieldId: 'contact-countryCode',
    label: 'Country Code',
    element: 'input',
    properties: {
      type: 'number',
    },
  },
  {
    id: 11,
    fieldId: 'contact-phoneNumber',
    label: 'Phone Number',
    element: 'input',
    properties: {
      type: 'tel',
    },
    format: 'phone',
  },
];

const preFormInformationData: IFixedFieldData[] = [
  {
    id: 0,
    fieldId: 'preform-maritalStatus',
    label: 'Marital Status',
    element: 'select',
    properties: {
      type: 'select',
    },
  },
  {
    id: 1,
    fieldId: 'preform-numberOfChildren',
    label: 'Number of Children',
    element: 'input',
    properties: {
      type: 'number',
    },
  },
  {
    id: 2,
    fieldId: 'preform-anyChildrenUnder18?',
    label: 'Any Children Under 18?',
    element: 'select',
    properties: {
      type: '',
    },
  },
  {
    id: 3,
    fieldId: 'preform-numberOfGuardians',
    label: 'Number of Guardians',
    element: 'input',
    properties: {
      type: 'number',
    },
  },
  {
    id: 4,
    fieldId: 'preform-numberOfHealthcareAgents',
    label: 'Number of Healthcare Agents',
    element: 'input',
    properties: {
      type: 'number',
    },
  },
  {
    id: 5,
    fieldId: 'preform-numberOfPropertyAgents',
    label: 'Number of Property Agents',
    element: 'input',
    properties: {
      type: 'number',
    },
  },
  {
    id: 6,
    fieldId: 'preform-numberOfHipaaAgents',
    label: 'Number of HIPAA Agents',
    element: 'input',
    properties: {
      type: 'number',
    },
  },
  {
    id: 7,
    fieldId: 'preform-numberOfExecutors',
    label: 'Number of Executors',
    element: 'input',
    properties: {
      type: 'number',
    },
  },
];

const willFormData: IDynamicFieldData = {
  Testator: [
    {
      id: 0,
      fieldId: 'will-testator-firstName',
      label: 'Testator | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 1,
      fieldId: 'will-testator-lastName',
      label: 'Testator | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 2,
      fieldId: 'will-testator-streetAddress',
      label: 'Testator | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 3,
      fieldId: 'will-testator-streetAddress2',
      label: 'Testator | Street Address 2',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 4,
      fieldId: 'will-testator-suiteApartmentNumber',
      label: 'Testator | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 5,
      fieldId: 'will-testator-city',
      label: 'Testator | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 6,
      fieldId: 'will-testator-stateProvinceRegion',
      label: 'Testator | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 7,
      fieldId: 'will-testator-postalZipCode',
      label: 'Testator | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 8,
      fieldId: 'will-testator-country',
      label: 'Testator | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 8,
      fieldId: 'will-testator-cityOfResidence',
      label: 'Testator | City of Residence',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 9,
      fieldId: 'will-testator-countyOfResidence',
      label: 'Testator | County of Residence',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 10,
      fieldId: 'will-testator-ssn',
      label: 'Testator | SSN',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 11,
      fieldId: 'will-testator-dateOfBirth',
      label: 'Testator | Date of Birth',
      element: 'input',
      properties: {
        type: 'date',
      },
    },
    {
      id: 12,
      fieldId: 'will-testator-gender',
      label: 'Testator | Gender',
      element: 'select',
      // element: 'input',
      properties: {
        type: 'text',
      },
    },
  ],
  Spouse: [
    {
      id: 13,
      fieldId: 'will-spouse-firstName',
      label: 'Spouse | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 14,
      fieldId: 'will-spouse-lastName',
      label: 'Spouse | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 15,
      fieldId: 'will-spouse-dateOfMarriage',
      label: 'Spouse | Date of Marriage',
      element: 'input',
      properties: {
        // type: 'date',
        type: 'text',
      },
    },
  ],
  Witnesses: [
    {
      id: 16,
      fieldId: 'will-witness-1-firstName',
      label: 'Witness 1 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 17,
      fieldId: 'will-witness-1-lastName',
      label: 'Witness 1 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 18,
      fieldId: 'will-witness-1-streetAddress',
      label: 'Witness 1 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 19,
      fieldId: 'will-witness-1-streetAddress2',
      label: 'Witness 1 | Street Address 2',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 20,
      fieldId: 'will-witness-1-suiteApartmentNumber',
      label: 'Witness 1 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 21,
      fieldId: 'will-witness-1-city',
      label: 'Witness 1 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 22,
      fieldId: 'will-witness-1-stateProvinceRegion',
      label: 'Witness 1 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 23,
      fieldId: 'will-witness-1-postalZipCode',
      label: 'Witness 1 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 24,
      fieldId: 'will-witness-1-country',
      label: 'Witness 1 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 25,
      fieldId: 'will-witness-2-firstName',
      label: 'Witness 2 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 26,
      fieldId: 'will-witness-2-lastName',
      label: 'Witness 2 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 27,
      fieldId: 'will-witness-2-streetAddress',
      label: 'Witness 2 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 28,
      fieldId: 'will-witness-2-streetAddress2',
      label: 'Witness 2 | Street Address 2',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 29,
      fieldId: 'will-witness-2-suiteApartmentNumber',
      label: 'Witness 2 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 30,
      fieldId: 'will-witness-2-city',
      label: 'Witness 2 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 31,
      fieldId: 'will-witness-2-stateProvinceRegion',
      label: 'Witness 2 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 32,
      fieldId: 'will-witness-2-postalZipCode',
      label: 'Witness 2 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 33,
      fieldId: 'will-witness-2-country',
      label: 'Witness 2 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 34,
      fieldId: 'will-witness-3-firstName',
      label: 'Witness 3 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 35,
      fieldId: 'will-witness-3-lastName',
      label: 'Witness 3 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 36,
      fieldId: 'will-witness-3-streetAddress',
      label: 'Witness 3 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 37,
      fieldId: 'will-witness-3-streetAddress2',
      label: 'Witness 3 | Street Address 2',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 38,
      fieldId: 'will-witness-3-suiteApartmentNumber',
      label: 'Witness 3 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 39,
      fieldId: 'will-witness-3-city',
      label: 'Witness 3 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 40,
      fieldId: 'will-witness-3-stateProvinceRegion',
      label: 'Witness 3 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 41,
      fieldId: 'will-witness-3-postalZipCode',
      label: 'Witness 3 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 42,
      fieldId: 'will-witness-3-country',
      label: 'Witness 3 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 43,
      fieldId: 'will-witness-4-firstName',
      label: 'Witness 4 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 44,
      fieldId: 'will-witness-4-lastName',
      label: 'Witness 4 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 45,
      fieldId: 'will-witness-4-streetAddress',
      label: 'Witness 4 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 46,
      fieldId: 'will-witness-4-streetAddress2',
      label: 'Witness 4 | Street Address 2',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 47,
      fieldId: 'will-witness-4-suiteApartmentNumber',
      label: 'Witness 4 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 48,
      fieldId: 'will-witness-4-city',
      label: 'Witness 4 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 49,
      fieldId: 'will-witness-4-stateProvinceRegion',
      label: 'Witness 4 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 50,
      fieldId: 'will-witness-4-postalZipCode',
      label: 'Witness 4 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 51,
      fieldId: 'will-witness-4-country',
      label: 'Witness 4 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
  ],
  Admin: [
    {
      id: 52,
      fieldId: 'will-admin-adminDate',
      label: 'Admin | Admin Date',
      element: 'input',
      properties: {
        // type: 'date',
        type: 'text',
      },
    },
  ],
  'Healthcare Agents': [
    {
      id: 53,
      fieldId: 'will-healthcareAgent-1-firstName',
      label: 'Healthcare Agent 1 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 54,
      fieldId: 'will-healthcareAgent-1-lastName',
      label: 'Healthcare Agent 1 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 55,
      fieldId: 'will-healthcareAgent-1-streetAddress',
      label: 'Healthcare Agent 1 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 56,
      fieldId: 'will-healthcareAgent-1-streetAddress2',
      label: 'Healthcare Agent 1 | Street Address 2',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 57,
      fieldId: 'will-healthcareAgent-1-suiteApartmentNumber',
      label: 'Healthcare Agent 1 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 58,
      fieldId: 'will-healthcareAgent-1-city',
      label: 'Healthcare Agent 1 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 59,
      fieldId: 'will-healthcareAgent-1-stateProvinceRegion',
      label: 'Healthcare Agent 1 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 60,
      fieldId: 'will-healthcareAgent-1-postalZipCode',
      label: 'Healthcare Agent 1 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 61,
      fieldId: 'will-healthcareAgent-1-country',
      label: 'Healthcare Agent 1 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 62,
      fieldId: 'will-healthcareAgent-1-countryCode',
      label: 'Healthcare Agent 1 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 63,
      fieldId: 'will-healthcareAgent-1-phoneNumber',
      label: 'Healthcare Agent 1 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
    {
      id: 64,
      fieldId: 'will-healthcareAgent-2-firstName',
      label: 'Healthcare Agent 2 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 65,
      fieldId: 'will-healthcareAgent-2-lastName',
      label: 'Healthcare Agent 2 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 66,
      fieldId: 'will-healthcareAgent-2-streetAddress',
      label: 'Healthcare Agent 2 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 67,
      fieldId: 'will-healthcareAgent-2-streetAddress2',
      label: 'Healthcare Agent 2 | Street Address 2',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 68,
      fieldId: 'will-healthcareAgent-2-suiteApartmentNumber',
      label: 'Healthcare Agent 2 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 69,
      fieldId: 'will-healthcareAgent-2-city',
      label: 'Healthcare Agent 2 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 70,
      fieldId: 'will-healthcareAgent-2-stateProvinceRegion',
      label: 'Healthcare Agent 2 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 71,
      fieldId: 'will-healthcareAgent-2-postalZipCode',
      label: 'Healthcare Agent 2 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 72,
      fieldId: 'will-healthcareAgent-2-country',
      label: 'Healthcare Agent 2 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 73,
      fieldId: 'will-healthcareAgent-2-countryCode',
      label: 'Healthcare Agent 2 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 74,
      fieldId: 'will-healthcareAgent-2-phoneNumber',
      label: 'Healthcare Agent 2 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
    {
      id: 75,
      fieldId: 'will-healthcareAgent-3-firstName',
      label: 'Healthcare Agent 3 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 76,
      fieldId: 'will-healthcareAgent-3-lastName',
      label: 'Healthcare Agent 3 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 77,
      fieldId: 'will-healthcareAgent-3-streetAddress',
      label: 'Healthcare Agent 3 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 78,
      fieldId: 'will-healthcareAgent-3-streetAddress2',
      label: 'Healthcare Agent 3 | Street Address 2',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 79,
      fieldId: 'will-healthcareAgent-3-suiteApartmentNumber',
      label: 'Healthcare Agent 3 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 80,
      fieldId: 'will-healthcareAgent-3-city',
      label: 'Healthcare Agent 3 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 81,
      fieldId: 'will-healthcareAgent-3-stateProvinceRegion',
      label: 'Healthcare Agent 3 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 82,
      fieldId: 'will-healthcareAgent-3-postalZipCode',
      label: 'Healthcare Agent 3 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 83,
      fieldId: 'will-healthcareAgent-3-country',
      label: 'Healthcare Agent 3 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 84,
      fieldId: 'will-healthcareAgent-3-countryCode',
      label: 'Healthcare Agent 3 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 85,
      fieldId: 'will-healthcareAgent-3-phoneNumber',
      label: 'Healthcare Agent 3 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
    {
      id: 86,
      fieldId: 'will-healthcareAgent-4-firstName',
      label: 'Healthcare Agent 4 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 87,
      fieldId: 'will-healthcareAgent-4-lastName',
      label: 'Healthcare Agent 4 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 88,
      fieldId: 'will-healthcareAgent-4-streetAddress',
      label: 'Healthcare Agent 4 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 89,
      fieldId: 'will-healthcareAgent-4-streetAddress2',
      label: 'Healthcare Agent 4 | Street Address 2',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 90,
      fieldId: 'will-healthcareAgent-4-suiteApartmentNumber',
      label: 'Healthcare Agent 4 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 91,
      fieldId: 'will-healthcareAgent-4-city',
      label: 'Healthcare Agent 4 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 92,
      fieldId: 'will-healthcareAgent-4-stateProvinceRegion',
      label: 'Healthcare Agent 4 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 93,
      fieldId: 'will-healthcareAgent-4-postalZipCode',
      label: 'Healthcare Agent 4 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 94,
      fieldId: 'will-healthcareAgent-4-country',
      label: 'Healthcare Agent 4 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 95,
      fieldId: 'will-healthcareAgent-4-countryCode',
      label: 'Healthcare Agent 4 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 96,
      fieldId: 'will-healthcareAgent-4-phoneNumber',
      label: 'Healthcare Agent 4 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
  ],
  'Property Agents': [
    {
      id: 97,
      fieldId: 'will-propertyAgent-1-firstName',
      label: 'Property Agent 1 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 98,
      fieldId: 'will-propertyAgent-1-lastName',
      label: 'Property Agent 1 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 99,
      fieldId: 'will-propertyAgent-1-streetAddress',
      label: 'Property Agent 1 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 100,
      fieldId: 'will-propertyAgent-1-streetAddress2',
      label: 'Property Agent 1 | Street Address 2',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 101,
      fieldId: 'will-propertyAgent-1-suiteApartmentNumber',
      label: 'Property Agent 1 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 102,
      fieldId: 'will-propertyAgent-1-city',
      label: 'Property Agent 1 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 103,
      fieldId: 'will-propertyAgent-1-stateProvinceRegion',
      label: 'Property Agent 1 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 104,
      fieldId: 'will-propertyAgent-1-postalZipCode',
      label: 'Property Agent 1 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 105,
      fieldId: 'will-propertyAgent-1-country',
      label: 'Property Agent 1 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 106,
      fieldId: 'will-propertyAgent-2-firstName',
      label: 'Property Agent 2 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 107,
      fieldId: 'will-propertyAgent-2-lastName',
      label: 'Property Agent 2 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 108,
      fieldId: 'will-propertyAgent-2-streetAddress',
      label: 'Property Agent 2 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 109,
      fieldId: 'will-propertyAgent-2-streetAddress2',
      label: 'Property Agent 2 | Street Address 2',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 110,
      fieldId: 'will-propertyAgent-2-suiteApartmentNumber',
      label: 'Property Agent 2 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 111,
      fieldId: 'will-propertyAgent-2-city',
      label: 'Property Agent 2 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 112,
      fieldId: 'will-propertyAgent-2-stateProvinceRegion',
      label: 'Property Agent 2 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 113,
      fieldId: 'will-propertyAgent-2-postalZipCode',
      label: 'Property Agent 2 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 114,
      fieldId: 'will-propertyAgent-2-country',
      label: 'Property Agent 2 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 115,
      fieldId: 'will-propertyAgent-3-firstName',
      label: 'Property Agent 3 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 116,
      fieldId: 'will-propertyAgent-3-lastName',
      label: 'Property Agent 3 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 117,
      fieldId: 'will-propertyAgent-3-streetAddress',
      label: 'Property Agent 3 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 118,
      fieldId: 'will-propertyAgent-3-streetAddress2',
      label: 'Property Agent 3 | Street Address 2',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 119,
      fieldId: 'will-propertyAgent-3-suiteApartmentNumber',
      label: 'Property Agent 3 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 120,
      fieldId: 'will-propertyAgent-3-city',
      label: 'Property Agent 3 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 121,
      fieldId: 'will-propertyAgent-3-stateProvinceRegion',
      label: 'Property Agent 3 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 122,
      fieldId: 'will-propertyAgent-3-postalZipCode',
      label: 'Property Agent 3 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 123,
      fieldId: 'will-propertyAgent-3-country',
      label: 'Property Agent 3 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 124,
      fieldId: 'will-propertyAgent-4-firstName',
      label: 'Property Agent 4 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 125,
      fieldId: 'will-propertyAgent-4-lastName',
      label: 'Property Agent 4 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 126,
      fieldId: 'will-propertyAgent-4-streetAddress',
      label: 'Property Agent 4 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 127,
      fieldId: 'will-propertyAgent-4-streetAddress2',
      label: 'Property Agent 4 | Street Address 2',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 128,
      fieldId: 'will-propertyAgent-4-suiteApartmentNumber',
      label: 'Property Agent 4 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 129,
      fieldId: 'will-propertyAgent-4-city',
      label: 'Property Agent 4 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 130,
      fieldId: 'will-propertyAgent-4-stateProvinceRegion',
      label: 'Property Agent 4 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 131,
      fieldId: 'will-propertyAgent-4-postalZipCode',
      label: 'Property Agent 4 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 132,
      fieldId: 'will-propertyAgent-4-country',
      label: 'Property Agent 4 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
  ],
  'HIPAA Agents': [
    {
      id: 133,
      fieldId: 'will-hipaaAgent-1-firstName',
      label: 'HIPAA Agent 1 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 134,
      fieldId: 'will-hipaaAgent-1-lastName',
      label: 'HIPAA Agent 1 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 135,
      fieldId: 'will-hipaaAgent-2-firstName',
      label: 'HIPAA Agent 2 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 136,
      fieldId: 'will-hipaaAgent-2-lastName',
      label: 'HIPAA Agent 2 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 137,
      fieldId: 'will-hipaaAgent-3-firstName',
      label: 'HIPAA Agent 3 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 138,
      fieldId: 'will-hipaaAgent-3-lastName',
      label: 'HIPAA Agent 3 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 139,
      fieldId: 'will-hipaaAgent-4-firstName',
      label: 'HIPAA Agent 4 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 140,
      fieldId: 'will-hipaaAgent-4-lastName',
      label: 'HIPAA Agent 4 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
  ],
  Parents: [
    {
      id: 141,
      fieldId: 'will-parent-1-firstName',
      label: 'Parent 1 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 142,
      fieldId: 'will-parent-1-lastName',
      label: 'Parent 1 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 143,
      fieldId: 'will-parent-1-streetAddress',
      label: 'Parent 1 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 144,
      fieldId: 'will-parent-1-streetAddress2',
      label: 'Parent 1 | Street Address 2',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 145,
      fieldId: 'will-parent-1-suiteApartmentNumber',
      label: 'Parent 1 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 146,
      fieldId: 'will-parent-1-city',
      label: 'Parent 1 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 147,
      fieldId: 'will-parent-1-stateProvinceRegion',
      label: 'Parent 1 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 148,
      fieldId: 'will-parent-1-postalZipCode',
      label: 'Parent 1 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 149,
      fieldId: 'will-parent-1-country',
      label: 'Parent 1 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 150,
      fieldId: 'will-parent-2-firstName',
      label: 'Parent 2 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 151,
      fieldId: 'will-parent-2-lastName',
      label: 'Parent 2 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 152,
      fieldId: 'will-parent-2-streetAddress',
      label: 'Parent 2 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 153,
      fieldId: 'will-parent-2-streetAddress2',
      label: 'Parent 2 | Street Address 2',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 154,
      fieldId: 'will-parent-2-suiteApartmentNumber',
      label: 'Parent 2 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 155,
      fieldId: 'will-parent-2-city',
      label: 'Parent 2 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 156,
      fieldId: 'will-parent-2-stateProvinceRegion',
      label: 'Parent 2 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 157,
      fieldId: 'will-parent-2-postalZipCode',
      label: 'Parent 2 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 158,
      fieldId: 'will-parent-2-country',
      label: 'Parent 2 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
  ],
  Children: [
    {
      id: 159,
      fieldId: 'will-child-1-firstName',
      label: 'Child 1 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 160,
      fieldId: 'will-child-1-lastName',
      label: 'Child 1 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 161,
      fieldId: 'will-child-1-dateOfBirth',
      label: 'Child 1 | Date of Birth',
      element: 'input',
      properties: {
        // type: 'date',
        type: 'text',
      },
    },
    {
      id: 162,
      fieldId: 'will-child-1-under18',
      label: 'Child 1 | Under 18?',
      // element: 'select',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 163,
      fieldId: 'will-child-2-firstName',
      label: 'Child 2 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 164,
      fieldId: 'will-child-2-lastName',
      label: 'Child 2 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 165,
      fieldId: 'will-child-2-dateOfBirth',
      label: 'Child 2 | Date of Birth',
      element: 'input',
      properties: {
        // type: 'date',
        type: 'text',
      },
    },
    {
      id: 166,
      fieldId: 'will-child-2-under18',
      label: 'Child 2 | Under 18?',
      // element: 'select',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 167,
      fieldId: 'will-child-3-firstName',
      label: 'Child 3 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 168,
      fieldId: 'will-child-3-lastName',
      label: 'Child 3 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 169,
      fieldId: 'will-child-3-dateOfBirth',
      label: 'Child 3 | Date of Birth',
      element: 'input',
      properties: {
        // type: 'date',
        type: 'text',
      },
    },
    {
      id: 170,
      fieldId: 'will-child-3-under18',
      label: 'Child 3 | Under 18?',
      // element: 'select',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 171,
      fieldId: 'will-child-4-firstName',
      label: 'Child 4 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 172,
      fieldId: 'will-child-4-lastName',
      label: 'Child 4 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 173,
      fieldId: 'will-child-4-dateOfBirth',
      label: 'Child 4 | Date of Birth',
      element: 'input',
      properties: {
        // type: 'date',
        type: 'text',
      },
    },
    {
      id: 174,
      fieldId: 'will-child-4-under18',
      label: 'Child 4 | Under 18?',
      // element: 'select',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 175,
      fieldId: 'will-child-5-firstName',
      label: 'Child 5 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 176,
      fieldId: 'will-child-5-lastName',
      label: 'Child 5 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 177,
      fieldId: 'will-child-5-dateOfBirth',
      label: 'Child 5 | Date of Birth',
      element: 'input',
      properties: {
        // type: 'date',
        type: 'text',
      },
    },
    {
      id: 178,
      fieldId: 'will-child-5-under18',
      label: 'Child 5 | Under 18?',
      // element: 'select',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 179,
      fieldId: 'will-child-6-firstName',
      label: 'Child 6 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 180,
      fieldId: 'will-child-6-lastName',
      label: 'Child 6 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 181,
      fieldId: 'will-child-6-dateOfBirth',
      label: 'Child 6 | Date of Birth',
      element: 'input',
      properties: {
        // type: 'date',
        type: 'text',
      },
    },
    {
      id: 182,
      fieldId: 'will-child-6-under18',
      label: 'Child 6 | Under 18?',
      // element: 'select',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 183,
      fieldId: 'will-child-7-firstName',
      label: 'Child 7 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 184,
      fieldId: 'will-child-7-lastName',
      label: 'Child 7 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 185,
      fieldId: 'will-child-7-dateOfBirth',
      label: 'Child 7 | Date of Birth',
      element: 'input',
      properties: {
        // type: 'date',
        type: 'text',
      },
    },
    {
      id: 186,
      fieldId: 'will-child-7-under18',
      label: 'Child 7 | Under 18?',
      // element: 'select',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 187,
      fieldId: 'will-child-8-firstName',
      label: 'Child 8 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 188,
      fieldId: 'will-child-8-lastName',
      label: 'Child 8 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 189,
      fieldId: 'will-child-8-dateOfBirth',
      label: 'Child 8 | Date of Birth',
      element: 'input',
      properties: {
        // type: 'date',
        type: 'text',
      },
    },
    {
      id: 190,
      fieldId: 'will-child-8-under18',
      label: 'Child 8 | Under 18?',
      // element: 'select',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
  ],
  Executors: [
    {
      id: 191,
      fieldId: 'will-executor-1-firstName',
      label: 'Executor 1 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 192,
      fieldId: 'will-executor-1-lastName',
      label: 'Executor 1 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 193,
      fieldId: 'will-executor-2-firstName',
      label: 'Executor 2 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 194,
      fieldId: 'will-executor-2-lastName',
      label: 'Executor 2 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 195,
      fieldId: 'will-executor-3-firstName',
      label: 'Executor 3 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 196,
      fieldId: 'will-executor-3-lastName',
      label: 'Executor 3 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 197,
      fieldId: 'will-executor-4-firstName',
      label: 'Executor 4 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 198,
      fieldId: 'will-executor-4-lastName',
      label: 'Executor 4 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
  ],
  Guardians: [
    {
      id: 199,
      fieldId: 'will-guardian-1-firstName',
      label: 'Guardian 1 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 200,
      fieldId: 'will-guardian-1-lastName',
      label: 'Guardian 1 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 201,
      fieldId: 'will-guardian-1-streetAddress',
      label: 'Guardian 1 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 202,
      fieldId: 'will-guardian-1-streetAddress2',
      label: 'Guardian 1 | Street Address 2',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 203,
      fieldId: 'will-guardian-1-suiteApartmentNumber',
      label: 'Guardian 1 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 204,
      fieldId: 'will-guardian-1-city',
      label: 'Guardian 1 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 205,
      fieldId: 'will-guardian-1-stateProvinceRegion',
      label: 'Guardian 1 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 206,
      fieldId: 'will-guardian-1-postalZipCode',
      label: 'Guardian 1 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 207,
      fieldId: 'will-guardian-1-country',
      label: 'Guardian 1 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 208,
      fieldId: 'will-guardian-2-firstName',
      label: 'Guardian 2 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 209,
      fieldId: 'will-guardian-2-lastName',
      label: 'Guardian 2 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 210,
      fieldId: 'will-guardian-2-streetAddress',
      label: 'Guardian 2 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 211,
      fieldId: 'will-guardian-2-streetAddress2',
      label: 'Guardian 2 | Street Address 2',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 212,
      fieldId: 'will-guardian-2-suiteApartmentNumber',
      label: 'Guardian 2 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 213,
      fieldId: 'will-guardian-2-city',
      label: 'Guardian 2 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 214,
      fieldId: 'will-guardian-2-stateProvinceRegion',
      label: 'Guardian 2 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 215,
      fieldId: 'will-guardian-2-postalZipCode',
      label: 'Guardian 2 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 216,
      fieldId: 'will-guardian-2-country',
      label: 'Guardian 2 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 217,
      fieldId: 'will-guardian-3-firstName',
      label: 'Guardian 3 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 218,
      fieldId: 'will-guardian-3-lastName',
      label: 'Guardian 3 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 219,
      fieldId: 'will-guardian-3-streetAddress',
      label: 'Guardian 3 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 220,
      fieldId: 'will-guardian-3-streetAddress2',
      label: 'Guardian 3 | Street Address 2',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 221,
      fieldId: 'will-guardian-3-suiteApartmentNumber',
      label: 'Guardian 3 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 222,
      fieldId: 'will-guardian-3-city',
      label: 'Guardian 3 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 223,
      fieldId: 'will-guardian-3-stateProvinceRegion',
      label: 'Guardian 3 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 224,
      fieldId: 'will-guardian-3-postalZipCode',
      label: 'Guardian 3 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 225,
      fieldId: 'will-guardian-3-country',
      label: 'Guardian 3 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 226,
      fieldId: 'will-guardian-4-firstName',
      label: 'Guardian 4 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 227,
      fieldId: 'will-guardian-4-lastName',
      label: 'Guardian 4 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 228,
      fieldId: 'will-guardian-4-streetAddress',
      label: 'Guardian 4 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 229,
      fieldId: 'will-guardian-4-streetAddress2',
      label: 'Guardian 4 | Street Address 2',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 230,
      fieldId: 'will-guardian-4-suiteApartmentNumber',
      label: 'Guardian 4 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 231,
      fieldId: 'will-guardian-4-city',
      label: 'Guardian 4 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 232,
      fieldId: 'will-guardian-4-stateProvinceRegion',
      label: 'Guardian 4 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 233,
      fieldId: 'will-guardian-4-postalZipCode',
      label: 'Guardian 4 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 234,
      fieldId: 'will-guardian-4-country',
      label: 'Guardian 4 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
  ],
};

const Submissions = () => {
  return (
    <div className={styles.submissionsPageContainer}>
      <div className={styles.submissionSelectionContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.selectionHeader}>
            <h3 className={styles.selectionTitle}>Submission Selection</h3>
            <div className={styles.selectionActions}>
              <div className={styles.searchBarContainer}>
                <SearchIcon className={styles.searchIcon} />
                <input
                  className={styles.selectionSearchBar}
                  placeholder="Search here..."
                ></input>
              </div>
              <hr className={styles.actionsDivider} />
              <div className={styles.actionsButtons}>
                <button
                  className={styles.newSetButton}
                  onClick={() => console.log('new-set-button test successful!')}
                >
                  <NewSetIcon className={styles.newSetIcon} />
                  <p className={styles.newSetText}>New Submission</p>
                </button>
                <Link to={'/generator'} className={styles.returnText}>
                  <button
                    className={styles.returnButton}
                    onClick={() =>
                      console.log('return-button test successful!')
                    }
                  >
                    <ReturnIcon className={styles.returnIcon} />
                    <p className={styles.returnText}>Document Sets</p>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <ClientList />
        </div>
      </div>
    </div>
  );
};

export default Submissions;
