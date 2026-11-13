import {
  IStatisticData,
  IFixedFormSection,
  IDynamicFormSection,
  IFixedFieldData,
  IDynamicFieldData,
} from '@/types/editor.types';
import SubmissionStatistics from '@/components/SubmissionStatistics';
import PageActions from '@/components/fieldEditor/PageActions';
import EditorSection from '@/components/fieldEditor/EditorSection';
import styles from './editor.module.css';

// ? Mock Data Set (DEVELOPMENT USE)
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

// ? Mock Data Set (DEVELOPMENT USE)
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

// ? Mock Data Set (DEVELOPMENT USE)
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
      type: 'select',
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

// ? Mock Data Set (DEVELOPMENT USE)
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
      fieldId: 'will-testator-suiteApartmentNumber',
      label: 'Testator | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 4,
      fieldId: 'will-testator-city',
      label: 'Testator | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 5,
      fieldId: 'will-testator-stateProvinceRegion',
      label: 'Testator | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 6,
      fieldId: 'will-testator-postalZipCode',
      label: 'Testator | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 7,
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
      properties: {
        type: 'select',
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
      fieldId: 'will-witness-1-suiteApartmentNumber',
      label: 'Witness 1 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 20,
      fieldId: 'will-witness-1-city',
      label: 'Witness 1 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 21,
      fieldId: 'will-witness-1-stateProvinceRegion',
      label: 'Witness 1 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 22,
      fieldId: 'will-witness-1-postalZipCode',
      label: 'Witness 1 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 23,
      fieldId: 'will-witness-1-country',
      label: 'Witness 1 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 24,
      fieldId: 'will-witness-2-firstName',
      label: 'Witness 2 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 25,
      fieldId: 'will-witness-2-lastName',
      label: 'Witness 2 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 26,
      fieldId: 'will-witness-2-streetAddress',
      label: 'Witness 2 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 27,
      fieldId: 'will-witness-2-suiteApartmentNumber',
      label: 'Witness 2 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 28,
      fieldId: 'will-witness-2-city',
      label: 'Witness 2 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 29,
      fieldId: 'will-witness-2-stateProvinceRegion',
      label: 'Witness 2 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 30,
      fieldId: 'will-witness-2-postalZipCode',
      label: 'Witness 2 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 31,
      fieldId: 'will-witness-2-country',
      label: 'Witness 2 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
  ],
  Admin: [
    {
      id: 32,
      fieldId: 'will-admin-adminDate',
      label: 'Admin | Admin Date',
      element: 'input',
      properties: {
        type: 'date',
      },
    },
  ],
  'Healthcare Agents': [
    {
      id: 33,
      fieldId: 'will-healthcareAgent-1-firstName',
      label: 'Healthcare Agent 1 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 34,
      fieldId: 'will-healthcareAgent-1-lastName',
      label: 'Healthcare Agent 1 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 35,
      fieldId: 'will-healthcareAgent-1-streetAddress',
      label: 'Healthcare Agent 1 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 36,
      fieldId: 'will-healthcareAgent-1-suiteApartmentNumber',
      label: 'Healthcare Agent 1 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 37,
      fieldId: 'will-healthcareAgent-1-city',
      label: 'Healthcare Agent 1 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 38,
      fieldId: 'will-healthcareAgent-1-stateProvinceRegion',
      label: 'Healthcare Agent 1 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 39,
      fieldId: 'will-healthcareAgent-1-postalZipCode',
      label: 'Healthcare Agent 1 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 40,
      fieldId: 'will-healthcareAgent-1-country',
      label: 'Healthcare Agent 1 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 41,
      fieldId: 'will-healthcareAgent-1-countryCode',
      label: 'Healthcare Agent 1 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 42,
      fieldId: 'will-healthcareAgent-1-phoneNumber',
      label: 'Healthcare Agent 1 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
    {
      id: 43,
      fieldId: 'will-healthcareAgent-2-firstName',
      label: 'Healthcare Agent 2 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 44,
      fieldId: 'will-healthcareAgent-2-lastName',
      label: 'Healthcare Agent 2 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 45,
      fieldId: 'will-healthcareAgent-2-streetAddress',
      label: 'Healthcare Agent 2 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 46,
      fieldId: 'will-healthcareAgent-2-suiteApartmentNumber',
      label: 'Healthcare Agent 2 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 47,
      fieldId: 'will-healthcareAgent-2-city',
      label: 'Healthcare Agent 2 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 48,
      fieldId: 'will-healthcareAgent-2-stateProvinceRegion',
      label: 'Healthcare Agent 2 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 49,
      fieldId: 'will-healthcareAgent-2-postalZipCode',
      label: 'Healthcare Agent 2 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 50,
      fieldId: 'will-healthcareAgent-2-country',
      label: 'Healthcare Agent 2 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 51,
      fieldId: 'will-healthcareAgent-2-countryCode',
      label: 'Healthcare Agent 2 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 52,
      fieldId: 'will-healthcareAgent-2-phoneNumber',
      label: 'Healthcare Agent 2 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
    {
      id: 53,
      fieldId: 'will-healthcareAgent-3-firstName',
      label: 'Healthcare Agent 3 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 54,
      fieldId: 'will-healthcareAgent-3-lastName',
      label: 'Healthcare Agent 3 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 55,
      fieldId: 'will-healthcareAgent-3-streetAddress',
      label: 'Healthcare Agent 3 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 56,
      fieldId: 'will-healthcareAgent-3-suiteApartmentNumber',
      label: 'Healthcare Agent 3 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 57,
      fieldId: 'will-healthcareAgent-3-city',
      label: 'Healthcare Agent 3 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 58,
      fieldId: 'will-healthcareAgent-3-stateProvinceRegion',
      label: 'Healthcare Agent 3 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 59,
      fieldId: 'will-healthcareAgent-3-postalZipCode',
      label: 'Healthcare Agent 3 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 60,
      fieldId: 'will-healthcareAgent-3-country',
      label: 'Healthcare Agent 3 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 61,
      fieldId: 'will-healthcareAgent-3-countryCode',
      label: 'Healthcare Agent 3 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 62,
      fieldId: 'will-healthcareAgent-3-phoneNumber',
      label: 'Healthcare Agent 3 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
    {
      id: 63,
      fieldId: 'will-healthcareAgent-4-firstName',
      label: 'Healthcare Agent 4 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 64,
      fieldId: 'will-healthcareAgent-4-lastName',
      label: 'Healthcare Agent 4 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 65,
      fieldId: 'will-healthcareAgent-4-streetAddress',
      label: 'Healthcare Agent 4 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 66,
      fieldId: 'will-healthcareAgent-4-suiteApartmentNumber',
      label: 'Healthcare Agent 4 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 67,
      fieldId: 'will-healthcareAgent-4-city',
      label: 'Healthcare Agent 4 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 68,
      fieldId: 'will-healthcareAgent-4-stateProvinceRegion',
      label: 'Healthcare Agent 4 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 69,
      fieldId: 'will-healthcareAgent-4-postalZipCode',
      label: 'Healthcare Agent 4 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 70,
      fieldId: 'will-healthcareAgent-4-country',
      label: 'Healthcare Agent 4 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 71,
      fieldId: 'will-healthcareAgent-4-countryCode',
      label: 'Healthcare Agent 4 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 72,
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
      id: 73,
      fieldId: 'will-propertyAgent-1-firstName',
      label: 'Property Agent 1 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 74,
      fieldId: 'will-propertyAgent-1-lastName',
      label: 'Property Agent 1 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 75,
      fieldId: 'will-propertyAgent-1-streetAddress',
      label: 'Property Agent 1 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 76,
      fieldId: 'will-propertyAgent-1-suiteApartmentNumber',
      label: 'Property Agent 1 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 77,
      fieldId: 'will-propertyAgent-1-city',
      label: 'Property Agent 1 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 78,
      fieldId: 'will-propertyAgent-1-stateProvinceRegion',
      label: 'Property Agent 1 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 79,
      fieldId: 'will-propertyAgent-1-postalZipCode',
      label: 'Property Agent 1 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 80,
      fieldId: 'will-propertyAgent-1-country',
      label: 'Property Agent 1 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 81,
      fieldId: 'will-propertyAgent-1-countryCode',
      label: 'Property Agent 1 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 82,
      fieldId: 'will-propertyAgent-1-phoneNumber',
      label: 'Property Agent 1 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
    {
      id: 83,
      fieldId: 'will-propertyAgent-2-firstName',
      label: 'Property Agent 2 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 84,
      fieldId: 'will-propertyAgent-2-lastName',
      label: 'Property Agent 2 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 85,
      fieldId: 'will-propertyAgent-2-streetAddress',
      label: 'Property Agent 2 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 86,
      fieldId: 'will-propertyAgent-2-suiteApartmentNumber',
      label: 'Property Agent 2 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 87,
      fieldId: 'will-propertyAgent-2-city',
      label: 'Property Agent 2 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 88,
      fieldId: 'will-propertyAgent-2-stateProvinceRegion',
      label: 'Property Agent 2 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 89,
      fieldId: 'will-propertyAgent-2-postalZipCode',
      label: 'Property Agent 2 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 90,
      fieldId: 'will-propertyAgent-2-country',
      label: 'Property Agent 2 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 91,
      fieldId: 'will-propertyAgent-2-countryCode',
      label: 'Property Agent 2 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 92,
      fieldId: 'will-propertyAgent-2-phoneNumber',
      label: 'Property Agent 2 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
    {
      id: 93,
      fieldId: 'will-propertyAgent-3-firstName',
      label: 'Property Agent 3 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 94,
      fieldId: 'will-propertyAgent-3-lastName',
      label: 'Property Agent 3 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 95,
      fieldId: 'will-propertyAgent-3-streetAddress',
      label: 'Property Agent 3 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 96,
      fieldId: 'will-propertyAgent-3-suiteApartmentNumber',
      label: 'Property Agent 3 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 97,
      fieldId: 'will-propertyAgent-3-city',
      label: 'Property Agent 3 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 98,
      fieldId: 'will-propertyAgent-3-stateProvinceRegion',
      label: 'Property Agent 3 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 99,
      fieldId: 'will-propertyAgent-3-postalZipCode',
      label: 'Property Agent 3 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 100,
      fieldId: 'will-propertyAgent-3-country',
      label: 'Property Agent 3 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 101,
      fieldId: 'will-propertyAgent-3-countryCode',
      label: 'Property Agent 3 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 102,
      fieldId: 'will-propertyAgent-3-phoneNumber',
      label: 'Property Agent 3 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
    {
      id: 103,
      fieldId: 'will-propertyAgent-4-firstName',
      label: 'Property Agent 4 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 104,
      fieldId: 'will-propertyAgent-4-lastName',
      label: 'Property Agent 4 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 105,
      fieldId: 'will-propertyAgent-4-streetAddress',
      label: 'Property Agent 4 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 106,
      fieldId: 'will-propertyAgent-4-suiteApartmentNumber',
      label: 'Property Agent 4 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 107,
      fieldId: 'will-propertyAgent-4-city',
      label: 'Property Agent 4 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 108,
      fieldId: 'will-propertyAgent-4-stateProvinceRegion',
      label: 'Property Agent 4 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 109,
      fieldId: 'will-propertyAgent-4-postalZipCode',
      label: 'Property Agent 4 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 110,
      fieldId: 'will-propertyAgent-4-country',
      label: 'Property Agent 4 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 111,
      fieldId: 'will-propertyAgent-4-countryCode',
      label: 'Property Agent 4 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 112,
      fieldId: 'will-propertyAgent-4-phoneNumber',
      label: 'Property Agent 4 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
  ],
  'HIPAA Agents': [
    {
      id: 113,
      fieldId: 'will-hipaaAgent-1-firstName',
      label: 'HIPAA Agent 1 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 114,
      fieldId: 'will-hipaaAgent-1-lastName',
      label: 'HIPAA Agent 1 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 115,
      fieldId: 'will-hipaaAgent-1-streetAddress',
      label: 'HIPAA Agent 1 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 116,
      fieldId: 'will-hipaaAgent-1-suiteApartmentNumber',
      label: 'HIPAA Agent 1 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 117,
      fieldId: 'will-hipaaAgent-1-city',
      label: 'HIPAA Agent 1 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 118,
      fieldId: 'will-hipaaAgent-1-stateProvinceRegion',
      label: 'HIPAA Agent 1 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 119,
      fieldId: 'will-hipaaAgent-1-postalZipCode',
      label: 'HIPAA Agent 1 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 120,
      fieldId: 'will-hipaaAgent-1-country',
      label: 'HIPAA Agent 1 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 121,
      fieldId: 'will-hipaaAgent-1-countryCode',
      label: 'HIPAA Agent 1 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 122,
      fieldId: 'will-hipaaAgent-1-phoneNumber',
      label: 'HIPAA Agent 1 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
    {
      id: 123,
      fieldId: 'will-hipaaAgent-2-firstName',
      label: 'HIPAA Agent 2 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 124,
      fieldId: 'will-hipaaAgent-2-lastName',
      label: 'HIPAA Agent 2 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 125,
      fieldId: 'will-hipaaAgent-2-streetAddress',
      label: 'HIPAA Agent 2 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 126,
      fieldId: 'will-hipaaAgent-2-suiteApartmentNumber',
      label: 'HIPAA Agent 2 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 127,
      fieldId: 'will-hipaaAgent-2-city',
      label: 'HIPAA Agent 2 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 128,
      fieldId: 'will-hipaaAgent-2-stateProvinceRegion',
      label: 'HIPAA Agent 2 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 129,
      fieldId: 'will-hipaaAgent-2-postalZipCode',
      label: 'HIPAA Agent 2 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 130,
      fieldId: 'will-hipaaAgent-2-country',
      label: 'HIPAA Agent 2 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 131,
      fieldId: 'will-hipaaAgent-2-countryCode',
      label: 'HIPAA Agent 2 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 132,
      fieldId: 'will-hipaaAgent-2-phoneNumber',
      label: 'HIPAA Agent 2 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
    {
      id: 133,
      fieldId: 'will-hipaaAgent-3-firstName',
      label: 'HIPAA Agent 3 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 134,
      fieldId: 'will-hipaaAgent-3-lastName',
      label: 'HIPAA Agent 3 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 135,
      fieldId: 'will-hipaaAgent-3-streetAddress',
      label: 'HIPAA Agent 3 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 136,
      fieldId: 'will-hipaaAgent-3-suiteApartmentNumber',
      label: 'HIPAA Agent 3 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 137,
      fieldId: 'will-hipaaAgent-3-city',
      label: 'HIPAA Agent 3 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 138,
      fieldId: 'will-hipaaAgent-3-stateProvinceRegion',
      label: 'HIPAA Agent 3 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 139,
      fieldId: 'will-hipaaAgent-3-postalZipCode',
      label: 'HIPAA Agent 3 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 140,
      fieldId: 'will-hipaaAgent-3-country',
      label: 'HIPAA Agent 3 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 141,
      fieldId: 'will-hipaaAgent-3-countryCode',
      label: 'HIPAA Agent 3 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 142,
      fieldId: 'will-hipaaAgent-3-phoneNumber',
      label: 'HIPAA Agent 3 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
    {
      id: 143,
      fieldId: 'will-hipaaAgent-4-firstName',
      label: 'HIPAA Agent 4 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 144,
      fieldId: 'will-hipaaAgent-4-lastName',
      label: 'HIPAA Agent 4 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 145,
      fieldId: 'will-hipaaAgent-4-streetAddress',
      label: 'HIPAA Agent 4 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 146,
      fieldId: 'will-hipaaAgent-4-suiteApartmentNumber',
      label: 'HIPAA Agent 4 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 147,
      fieldId: 'will-hipaaAgent-4-city',
      label: 'HIPAA Agent 4 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 148,
      fieldId: 'will-hipaaAgent-4-stateProvinceRegion',
      label: 'HIPAA Agent 4 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 149,
      fieldId: 'will-hipaaAgent-4-postalZipCode',
      label: 'HIPAA Agent 4 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 150,
      fieldId: 'will-hipaaAgent-4-country',
      label: 'HIPAA Agent 4 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 151,
      fieldId: 'will-hipaaAgent-4-countryCode',
      label: 'HIPAA Agent 4 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 152,
      fieldId: 'will-hipaaAgent-4-phoneNumber',
      label: 'HIPAA Agent 4 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
  ],
  Parents: [
    {
      id: 153,
      fieldId: 'will-parent-1-firstName',
      label: 'Parent 1 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 154,
      fieldId: 'will-parent-1-lastName',
      label: 'Parent 1 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 155,
      fieldId: 'will-parent-1-streetAddress',
      label: 'Parent 1 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 156,
      fieldId: 'will-parent-1-suiteApartmentNumber',
      label: 'Parent 1 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 157,
      fieldId: 'will-parent-1-city',
      label: 'Parent 1 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 158,
      fieldId: 'will-parent-1-stateProvinceRegion',
      label: 'Parent 1 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 159,
      fieldId: 'will-parent-1-postalZipCode',
      label: 'Parent 1 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 160,
      fieldId: 'will-parent-1-country',
      label: 'Parent 1 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 161,
      fieldId: 'will-parent-2-firstName',
      label: 'Parent 2 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 162,
      fieldId: 'will-parent-2-lastName',
      label: 'Parent 2 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 163,
      fieldId: 'will-parent-2-streetAddress',
      label: 'Parent 2 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 164,
      fieldId: 'will-parent-2-suiteApartmentNumber',
      label: 'Parent 2 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 165,
      fieldId: 'will-parent-2-city',
      label: 'Parent 2 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 166,
      fieldId: 'will-parent-2-stateProvinceRegion',
      label: 'Parent 2 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 167,
      fieldId: 'will-parent-2-postalZipCode',
      label: 'Parent 2 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 168,
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
      id: 169,
      fieldId: 'will-child-1-firstName',
      label: 'Child 1 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 170,
      fieldId: 'will-child-1-lastName',
      label: 'Child 1 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 171,
      fieldId: 'will-child-1-dateOfBirth',
      label: 'Child 1 | Date of Birth',
      element: 'input',
      properties: {
        type: 'date',
      },
    },
    {
      id: 172,
      fieldId: 'will-child-1-under18',
      label: 'Child 1 | Under 18?',
      element: 'select',
      properties: {
        type: 'select',
      },
    },
    {
      id: 173,
      fieldId: 'will-child-2-firstName',
      label: 'Child 2 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 174,
      fieldId: 'will-child-2-lastName',
      label: 'Child 2 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 175,
      fieldId: 'will-child-2-dateOfBirth',
      label: 'Child 2 | Date of Birth',
      element: 'input',
      properties: {
        type: 'date',
      },
    },
    {
      id: 176,
      fieldId: 'will-child-2-under18',
      label: 'Child 2 | Under 18?',
      element: 'select',
      properties: {
        type: 'select',
      },
    },
    {
      id: 177,
      fieldId: 'will-child-3-firstName',
      label: 'Child 3 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 178,
      fieldId: 'will-child-3-lastName',
      label: 'Child 3 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 179,
      fieldId: 'will-child-3-dateOfBirth',
      label: 'Child 3 | Date of Birth',
      element: 'input',
      properties: {
        type: 'date',
      },
    },
    {
      id: 180,
      fieldId: 'will-child-3-under18',
      label: 'Child 3 | Under 18?',
      element: 'select',
      properties: {
        type: 'select',
      },
    },
    {
      id: 181,
      fieldId: 'will-child-4-firstName',
      label: 'Child 4 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 182,
      fieldId: 'will-child-4-lastName',
      label: 'Child 4 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 183,
      fieldId: 'will-child-4-dateOfBirth',
      label: 'Child 4 | Date of Birth',
      element: 'input',
      properties: {
        type: 'date',
      },
    },
    {
      id: 184,
      fieldId: 'will-child-4-under18',
      label: 'Child 4 | Under 18?',
      element: 'select',
      properties: {
        type: 'select',
      },
    },
    {
      id: 185,
      fieldId: 'will-child-5-firstName',
      label: 'Child 5 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 186,
      fieldId: 'will-child-5-lastName',
      label: 'Child 5 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 187,
      fieldId: 'will-child-5-dateOfBirth',
      label: 'Child 5 | Date of Birth',
      element: 'input',
      properties: {
        type: 'date',
      },
    },
    {
      id: 188,
      fieldId: 'will-child-5-under18',
      label: 'Child 5 | Under 18?',
      element: 'select',
      properties: {
        type: 'select',
      },
    },
    {
      id: 189,
      fieldId: 'will-child-6-firstName',
      label: 'Child 6 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 190,
      fieldId: 'will-child-6-lastName',
      label: 'Child 6 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 191,
      fieldId: 'will-child-6-dateOfBirth',
      label: 'Child 6 | Date of Birth',
      element: 'input',
      properties: {
        type: 'date',
      },
    },
    {
      id: 192,
      fieldId: 'will-child-6-under18',
      label: 'Child 6 | Under 18?',
      element: 'select',
      properties: {
        type: 'select',
      },
    },
    {
      id: 193,
      fieldId: 'will-child-7-firstName',
      label: 'Child 7 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 194,
      fieldId: 'will-child-7-lastName',
      label: 'Child 7 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 195,
      fieldId: 'will-child-7-dateOfBirth',
      label: 'Child 7 | Date of Birth',
      element: 'input',
      properties: {
        type: 'date',
      },
    },
    {
      id: 196,
      fieldId: 'will-child-7-under18',
      label: 'Child 7 | Under 18?',
      element: 'select',
      properties: {
        type: 'select',
      },
    },
    {
      id: 197,
      fieldId: 'will-child-8-firstName',
      label: 'Child 8 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 198,
      fieldId: 'will-child-8-lastName',
      label: 'Child 8 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 199,
      fieldId: 'will-child-8-dateOfBirth',
      label: 'Child 8 | Date of Birth',
      element: 'input',
      properties: {
        type: 'date',
      },
    },
    {
      id: 200,
      fieldId: 'will-child-8-under18',
      label: 'Child 8 | Under 18?',
      element: 'select',
      properties: {
        type: 'select',
      },
    },
  ],
  Executors: [
    {
      id: 201,
      fieldId: 'will-executor-1-firstName',
      label: 'Executor 1 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 202,
      fieldId: 'will-executor-1-lastName',
      label: 'Executor 1 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 203,
      fieldId: 'will-executor-1-streetAddress',
      label: 'Executor 1 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 204,
      fieldId: 'will-executor-1-suiteApartmentNumber',
      label: 'Executor 1 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 205,
      fieldId: 'will-executor-1-city',
      label: 'Executor 1 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 206,
      fieldId: 'will-executor-1-stateProvinceRegion',
      label: 'Executor 1 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 207,
      fieldId: 'will-executor-1-postalZipCode',
      label: 'Executor 1 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 208,
      fieldId: 'will-executor-1-country',
      label: 'Executor 1 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 209,
      fieldId: 'will-executor-1-countryCode',
      label: 'Executor 1 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 210,
      fieldId: 'will-executor-1-phoneNumber',
      label: 'Executor 1 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
    {
      id: 211,
      fieldId: 'will-executor-2-firstName',
      label: 'Executor 2 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 212,
      fieldId: 'will-executor-2-lastName',
      label: 'Executor 2 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 213,
      fieldId: 'will-executor-2-streetAddress',
      label: 'Executor 2 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 214,
      fieldId: 'will-executor-2-suiteApartmentNumber',
      label: 'Executor 2 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 215,
      fieldId: 'will-executor-2-city',
      label: 'Executor 2 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 216,
      fieldId: 'will-executor-2-stateProvinceRegion',
      label: 'Executor 2 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 217,
      fieldId: 'will-executor-2-postalZipCode',
      label: 'Executor 2 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 218,
      fieldId: 'will-executor-2-country',
      label: 'Executor 2 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 219,
      fieldId: 'will-executor-2-countryCode',
      label: 'Executor 2 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 220,
      fieldId: 'will-executor-2-phoneNumber',
      label: 'Executor 2 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
    {
      id: 221,
      fieldId: 'will-executor-3-firstName',
      label: 'Executor 3 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 222,
      fieldId: 'will-executor-3-lastName',
      label: 'Executor 3 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 223,
      fieldId: 'will-executor-3-streetAddress',
      label: 'Executor 3 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 224,
      fieldId: 'will-executor-3-suiteApartmentNumber',
      label: 'Executor 3 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 225,
      fieldId: 'will-executor-3-city',
      label: 'Executor 3 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 226,
      fieldId: 'will-executor-3-stateProvinceRegion',
      label: 'Executor 3 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 227,
      fieldId: 'will-executor-3-postalZipCode',
      label: 'Executor 3 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 228,
      fieldId: 'will-executor-3-country',
      label: 'Executor 3 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 229,
      fieldId: 'will-executor-3-countryCode',
      label: 'Executor 3 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 230,
      fieldId: 'will-executor-3-phoneNumber',
      label: 'Executor 3 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
    {
      id: 231,
      fieldId: 'will-executor-4-firstName',
      label: 'Executor 4 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 232,
      fieldId: 'will-executor-4-lastName',
      label: 'Executor 4 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 233,
      fieldId: 'will-executor-4-streetAddress',
      label: 'Executor 4 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 234,
      fieldId: 'will-executor-4-suiteApartmentNumber',
      label: 'Executor 4 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 235,
      fieldId: 'will-executor-4-city',
      label: 'Executor 4 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 236,
      fieldId: 'will-executor-4-stateProvinceRegion',
      label: 'Executor 4 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 237,
      fieldId: 'will-executor-4-postalZipCode',
      label: 'Executor 4 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 238,
      fieldId: 'will-executor-4-country',
      label: 'Executor 4 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 239,
      fieldId: 'will-executor-4-countryCode',
      label: 'Executor 4 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 240,
      fieldId: 'will-executor-4-phoneNumber',
      label: 'Executor 4 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
  ],
  Guardians: [
    {
      id: 241,
      fieldId: 'will-guardian-1-firstName',
      label: 'Guardian 1 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 242,
      fieldId: 'will-guardian-1-lastName',
      label: 'Guardian 1 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 243,
      fieldId: 'will-guardian-1-streetAddress',
      label: 'Guardian 1 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 244,
      fieldId: 'will-guardian-1-suiteApartmentNumber',
      label: 'Guardian 1 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 245,
      fieldId: 'will-guardian-1-city',
      label: 'Guardian 1 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 246,
      fieldId: 'will-guardian-1-stateProvinceRegion',
      label: 'Guardian 1 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 247,
      fieldId: 'will-guardian-1-postalZipCode',
      label: 'Guardian 1 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 248,
      fieldId: 'will-guardian-1-country',
      label: 'Guardian 1 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 249,
      fieldId: 'will-guardian-1-countryCode',
      label: 'Guardian 1 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 250,
      fieldId: 'will-guardian-1-phoneNumber',
      label: 'Guardian 1 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
    {
      id: 251,
      fieldId: 'will-guardian-2-firstName',
      label: 'Guardian 2 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 252,
      fieldId: 'will-guardian-2-lastName',
      label: 'Guardian 2 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 253,
      fieldId: 'will-guardian-2-streetAddress',
      label: 'Guardian 2 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 254,
      fieldId: 'will-guardian-2-suiteApartmentNumber',
      label: 'Guardian 2 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 255,
      fieldId: 'will-guardian-2-city',
      label: 'Guardian 2 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 256,
      fieldId: 'will-guardian-2-stateProvinceRegion',
      label: 'Guardian 2 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 257,
      fieldId: 'will-guardian-2-postalZipCode',
      label: 'Guardian 2 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 258,
      fieldId: 'will-guardian-2-country',
      label: 'Guardian 2 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 259,
      fieldId: 'will-guardian-2-countryCode',
      label: 'Guardian 2 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 260,
      fieldId: 'will-guardian-2-phoneNumber',
      label: 'Guardian 2 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
    {
      id: 261,
      fieldId: 'will-guardian-3-firstName',
      label: 'Guardian 3 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 262,
      fieldId: 'will-guardian-3-lastName',
      label: 'Guardian 3 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 263,
      fieldId: 'will-guardian-3-streetAddress',
      label: 'Guardian 3 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 264,
      fieldId: 'will-guardian-3-streetAddress2',
      label: 'Guardian 3 | Street Address 2',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 265,
      fieldId: 'will-guardian-3-suiteApartmentNumber',
      label: 'Guardian 3 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 266,
      fieldId: 'will-guardian-3-city',
      label: 'Guardian 3 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 267,
      fieldId: 'will-guardian-3-stateProvinceRegion',
      label: 'Guardian 3 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 268,
      fieldId: 'will-guardian-3-postalZipCode',
      label: 'Guardian 3 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 269,
      fieldId: 'will-guardian-3-country',
      label: 'Guardian 3 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 270,
      fieldId: 'will-guardian-3-countryCode',
      label: 'Guardian 3 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 271,
      fieldId: 'will-guardian-3-phoneNumber',
      label: 'Guardian 3 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
    {
      id: 272,
      fieldId: 'will-guardian-4-firstName',
      label: 'Guardian 4 | First Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 273,
      fieldId: 'will-guardian-4-lastName',
      label: 'Guardian 4 | Last Name',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 274,
      fieldId: 'will-guardian-4-streetAddress',
      label: 'Guardian 4 | Street Address',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 275,
      fieldId: 'will-guardian-4-streetAddress2',
      label: 'Guardian 4 | Street Address 2',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 276,
      fieldId: 'will-guardian-4-suiteApartmentNumber',
      label: 'Guardian 4 | Suite/Apartment Number',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 277,
      fieldId: 'will-guardian-4-city',
      label: 'Guardian 4 | City',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 278,
      fieldId: 'will-guardian-4-stateProvinceRegion',
      label: 'Guardian 4 | State/Province/Region',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 279,
      fieldId: 'will-guardian-4-postalZipCode',
      label: 'Guardian 4 | Postal/Zip Code',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 280,
      fieldId: 'will-guardian-4-country',
      label: 'Guardian 4 | Country',
      element: 'input',
      properties: {
        type: 'text',
      },
    },
    {
      id: 281,
      fieldId: 'will-guardian-4-countryCode',
      label: 'Guardian 4 | Country Code',
      element: 'input',
      properties: {
        type: 'number',
      },
    },
    {
      id: 282,
      fieldId: 'will-guardian-4-phoneNumber',
      label: 'Guardian 4 | Phone Number',
      element: 'input',
      properties: {
        type: 'tel',
      },
    },
  ],
};

// ? Mock Data Set (DEVELOPMENT USE)
const formSections: (IFixedFormSection | IDynamicFormSection)[] = [
  {
    id: 0,
    section: 'Contact Information',
    fieldData: contactInformationData,
    filterKey: 'contact',
  },
  {
    id: 1,
    section: 'Pre-Form Information',
    fieldData: preFormInformationData,
    filterKey: 'preForm',
  },
  {
    id: 2,
    section: 'Will Form',
    subsections: [
      'Testator',
      'Spouse',
      'Witnesses',
      'Admin',
      'Healthcare Agents',
      'Property Agents',
      'HIPAA Agents',
      'Parents',
      'Children',
      'Executors',
      'Guardians',
    ],
    fieldData: willFormData,
    filterKey: 'will',
  },
];

const Header = () => {
  return (
    <div className={styles.fieldEditorContainer}>
      <div className={styles.editorHeader}>
        <h3 className={styles.editorTitle}>
          Field Editor
          <span className={styles.submissionEditorTitle}>
            &nbsp;&nbsp;|&nbsp;&nbsp;Brandon Raiz - 12/02/2024
          </span>
        </h3>
        <PageActions />
      </div>
      <div className={styles.statisticsContainer}>
        <SubmissionStatistics statisticData={statisticCardData} />
      </div>
    </div>
  );
};

const Editor = () => {
  return (
    <div className={styles.editorPageContainer}>
      <Header />
      {formSections.map((section) => {
        return <EditorSection sectionData={section} />;
      })}
    </div>
  );
};

export default Editor;

// function checkActiveTypeFilters(
//   activeTypeFilters: Set<string>,
//   inputType: HTMLInputTypeAttribute | 'select',
// ): boolean {
//   if (activeTypeFilters.has(inputType)) return true;
//   return false;
// }

// function checkActiveDataFilters(
//   activeDataFilters: Set<string>,
//   inputData: string | null,
// ) {
//   if (activeDataFilters.has('filled') && inputData) return true;
//   if (activeDataFilters.has('empty') && !inputData) return true;
//   return false;
// }

// function checkActiveSubsectionFilters(
//   activeSubsectionFilters: Set<string>,
//   subsection: string,
// ) {
//   if (activeSubsectionFilters.has(subsection)) return true;
//   return false;
// }

// const sectionFilters: ISectionFilters = {
//   contact: {
//     fieldTypes: [
//       { filter: 'Text Fields', set: 'type', type: 'text' },
//       { filter: 'Number Fields', set: 'type', type: 'number' },
//       { filter: 'Phone Fields', set: 'type', type: 'tel' },
//     ],
//     fieldData: [
//       { filter: 'Filled Fields', set: 'data', type: true },
//       { filter: 'Empty Fields', set: 'data', type: false },
//     ],
//   },
//   preForm: {
//     fieldTypes: [
//       { filter: 'Text Fields', set: 'type', type: 'text' },
//       { filter: 'Number Fields', set: 'type', type: 'number' },
//       { filter: 'Select Fields', set: 'type', type: 'select' },
//     ],
//     fieldData: [
//       { filter: 'Filled Fields', set: 'data', type: true },
//       { filter: 'Empty Fields', set: 'data', type: false },
//     ],
//   },
//   will: {
//     fieldTypes: [
//       { filter: 'Text Fields', set: 'type', type: 'text' },
//       { filter: 'Number Fields', set: 'type', type: 'number' },
//       { filter: 'Select Fields', set: 'type', type: 'select' },
//       { filter: 'Phone Fields', set: 'type', type: 'tel' },
//       { filter: 'Date Fields', set: 'type', type: 'date' },
//     ],
//     fieldData: [
//       { filter: 'Filled Fields', set: 'data', type: true },
//       { filter: 'Empty Fields', set: 'data', type: false },
//     ],
//     subsections: [
//       { filter: 'Testator', set: 'subsections', type: false },
//       { filter: 'Spouse', set: 'subsections', type: false },
//       { filter: 'Witnesses', set: 'subsections', type: false },
//       { filter: 'Admin', set: 'subsections', type: false },
//       { filter: 'Healthcare Agents', set: 'subsections', type: false },
//       { filter: 'Property Agents', set: 'subsections', type: false },
//       { filter: 'HIPAA Agents', set: 'subsections', type: false },
//       { filter: 'Parents', set: 'subsections', type: false },
//       { filter: 'Children', set: 'subsections', type: false },
//       { filter: 'Executors', set: 'subsections', type: false },
//       { filter: 'Guardians', set: 'subsections', type: false },
//     ],
//   },
// };

// const EditorSection = ({
//   sectionData,
// }: {
//   sectionData: IFixedFormSection | IDynamicFormSection;
// }) => {
//   const [isCollapsed, setCollapsed] = useState<boolean>(false);
//   const [filters, setFilters] = useState<ISectionFilters>(sectionFilters);
//   const [activeFilters, setActiveFilters] = useState({
//     type: new Set<string>(),
//     data: new Set<string>(),
//     subsections: new Set<string>(),
//   });
//   const dynamicData = useRef({ ...sectionData });
//   const dynamicFieldData = useRef({ ...sectionData.fieldData });
//   const [renderData, setRenderData] = useState<
//     IFixedFormSection | IDynamicFormSection
//   >({ ...sectionData });
//   const updater: Function = checkDataType();

//   //? Filter data based on the selected filters
//   //? -----------------------------------------
//   // Type Fields
//   // -------------------
//   // 1. While mapping data, check the data's (e).properties.type == "(type)"
//   // 2a. If true, rendering the field
//   // 2b. If false, do not render the field

//   //* Data Fields
//   //* -------------------
//   // 1. W.I.P until data fetching is implemented

//   //* Subsections
//   //* -------------------
//   // 1. Check sectionData?.subsections
//   // 2a. If true, skip matching property keys in the dataset while rendering the subsections
//   // 2b. If false, ignore any subsection related executions

//   function filterFixedData(data: IFixedFieldData[]): void {
//     //@ts-ignore
//     const filteredSectionData: IFixedFormSection = {
//       ...sectionData,
//     };
//     let filteredList = [];

//     if (activeFilters.type.size == 0) {
//       setRenderData(filteredSectionData);
//       return;
//     }

//     for (const field of data) {
//       if (checkActiveTypeFilters(activeFilters.type, field.properties.type)) {
//         filteredList.push(field);
//       }
//     }
//     filteredSectionData.fieldData = filteredList;

//     setRenderData(filteredSectionData);
//   }

//   function filterDynamicData(data: IFixedFieldData[]): void {
//     dynamicData.current.fieldData = { ...dynamicFieldData.current };

//     //@ts-ignore
//     const filteredSectionData: IDynamicFormSection = {
//       ...sectionData,
//     };

//     if (activeFilters.type.size == 0) {
//       setRenderData({
//         ...sectionData,
//         fieldData: dynamicFieldData.current,
//       });
//       return;
//     }

//     for (const subsection in data) {
//       const filteredSubsectionData: IDynamicFieldData =
//         dynamicFieldData.current[subsection];

//       let filteredList = [];
//       for (const field of filteredSubsectionData) {
//         if (checkActiveTypeFilters(activeFilters.type, field.properties.type)) {
//           filteredList.push(field);
//         }
//       }
//       filteredSectionData.fieldData[subsection] = filteredList;
//     }

//     setRenderData(filteredSectionData);
//   }

//   const [isFilterModalVisible, setFilterModalVisible] =
//     useState<boolean>(false);

//   function toggleCollapsed(): void {
//     setCollapsed(!isCollapsed);
//   }

//   function toggleFilterModalVisible(): void {
//     setFilterModalVisible(!isFilterModalVisible);
//   }

//   function handleFilterChange(
//     set: 'type' | 'data' | 'subsections',
//     filter: string,
//   ): void {
//     const filteredSet = activeFilters[set];
//     let testFieldData = sectionData.fieldData;

//     if (!filteredSet) {
//       console.log('filteredSet is false, returning early');
//       return;
//     }
//     if (filteredSet?.has(filter)) {
//       console.log('Deleting filter');
//       filteredSet.delete(filter);
//       filteredSet.has(filter);
//     } else {
//       console.log('Adding filter');
//       filteredSet.add(filter);
//     }

//     setActiveFilters({ ...activeFilters, type: filteredSet });
//   }

//   function clearFilters() {
//     console.log('CLEAR FILTERS EXECUTING');
//     const type = new Set<string>();
//     const data = new Set<string>();
//     const subsections = new Set<string>();

//     setActiveFilters({
//       ...activeFilters,
//       type: type,
//       data: data,
//       subsections: subsections,
//     });
//   }

//   function checkDataType(): Function {
//     if (renderData?.subsections) {
//       return filterDynamicData;
//     }
//     return filterFixedData;
//   }

//   return (
//     <div className={styles.fieldEditorContainer}>
//       <FilterModal
//         isVisible={isFilterModalVisible}
//         closeModal={toggleFilterModalVisible}
//         filters={filters[sectionData.filterKey]}
//         activeFilters={{
//           value: activeFilters,
//           setter: handleFilterChange,
//           clear: clearFilters,
//         }}
//         updater={updater}
//         updateParams={{
//           data: sectionData.fieldData,
//           filteredSet: activeFilters,
//         }}
//       />
//       <div
//         className={styles.editorHeader}
//         style={
//           sectionData?.subsections
//             ? {
//                 borderBottom: 'none',
//               }
//             : isCollapsed
//               ? {
//                   borderBottom: 'none',
//                 }
//               : {}
//         }
//       >
//         <h3 className={styles.editorTitle}>
//           {sectionData.section}
//           <span className={styles.submissionEditorTitle}>
//             &nbsp;&nbsp;|&nbsp;&nbsp;Jennifer Raiz - 12/02/2024
//           </span>
//         </h3>
//         <SectionActions
//           collapsed={{ value: isCollapsed, toggle: toggleCollapsed }}
//           filterModal={{
//             value: isFilterModalVisible,
//             toggle: toggleFilterModalVisible,
//           }}
//         />
//       </div>
//       <div className={isCollapsed ? styles.collapsedListContainer : ''}>
//         {/* <Suspense fallback={<p>Loading {sectionData.section} Fields...</p>}> */}
//         <FieldList sectionData={renderData} />
//         {/* </Suspense> */}
//       </div>
//     </div>
//   );
// };

// const FieldList = ({
//   sectionData,
// }: {
//   sectionData: IFixedFormSection | IDynamicFormSection;
// }) => {
//   if (!sectionData)
//     throw new Error(
//       'An error occurred while rendering the FieldList component. sectionData argument is null!',
//     );
//   if (sectionData?.subsections) {
//     return <DynamicFieldList sectionData={sectionData} />;
//   } else {
//     return <FixedFieldList sectionData={sectionData} />;
//   }
// };

// const FixedFieldList = ({
//   sectionData,
// }: {
//   sectionData: IFixedFormSection;
// }) => {
//   return (
//     <div className={styles.fixedFieldsContainer}>
//       {sectionData.fieldData.map((field) => {
//         if (field.element == 'input') {
//           if (field.properties.type == 'date') {
//             return <DateField fieldData={field} />;
//           } else {
//             return <DynamicInputField fieldData={field} />;
//           }
//         } else {
//           return <SelectField fieldData={field} />;
//         }
//       })}
//     </div>
//   );
// };

// const DynamicFieldList = ({
//   sectionData,
// }: {
//   sectionData: IDynamicFormSection;
// }) => {
//   return sectionData.subsections.map((subsection: string) => {
//     if (sectionData.fieldData[subsection].length == 0) return;

//     return (
//       <CollapsibleDivider
//         section={subsection}
//         subsections={false}
//         children={sectionData.fieldData[subsection].map((field) => {
//           if (field.element == 'input') {
//             if (field.properties.type == 'date') {
//               return <DateField fieldData={field} />;
//             } else {
//               return <DynamicInputField fieldData={field} />;
//             }
//           } else {
//             return <SelectField fieldData={field} />;
//           }
//         })}
//       />
//     );
//   });
// };

{
  /* <div className={styles.editorHeader}>
  <h3 className={styles.editorTitle}>
    Field Editor
    <span className={styles.submissionEditorTitle}>
      &nbsp;&nbsp;|&nbsp;&nbsp;Brandon Raiz - 12/02/2024
    </span>
  </h3>
  <div className={styles.selectionActions}>
    <div className={styles.actionsButtons}>
      <button
        className={styles.saveButton}
        onClick={() => console.log('save button test successful!')}
      >
        <SaveIcon className={styles.saveIcon} />
        <p className={styles.saveButtonText}>Save</p>
      </button>
      <button
        className={styles.deleteButton}
        onClick={() => console.log('delete button test successful!')}
      >
        <DeleteIcon className={styles.deleteIcon} />
        <p className={styles.deleteButtonText}>Delete</p>
      </button>
      <hr className={styles.actionsDivider} />
      <button
        className={styles.filterButton}
        onClick={() => console.log('filter button test successful!')}
      >
        <FilterIcon className={styles.filterIcon} />
        <p className={styles.filterButtonText}>Filters</p>
      </button>
      <hr className={styles.actionsDivider} />
      <button
        className={styles.returnButton}
        onClick={() => console.log('return button test successful!')}
      >
        <ReturnIcon className={styles.returnIcon} />
        <p className={styles.returnText}>Submissions</p>
      </button>
    </div>
  </div>
</div>
<div className={styles.editorListContainer}>
  <CollapsibleDivider
    section={'Submission Statistics'}
    subsections={false}
    children={
      <SubmissionStatistics statisticData={statisticCardData} />
    }
    style={{ paddingLeft: '3.3%', paddingRight: '3.3%' }}
  />
  {formSections.map((section) => {
    return (
      <Suspense fallback={<p>Loading {section.section} Fields...</p>}>
        <CollapsibleDivider
          section={section.section}
          subsections={Boolean(section?.subsections)}
          children={
            section?.subsections
              ? section.subsections.map((subsection) => {
                  return (
                    <SubsectionDivider
                      subsection={subsection}
                      children={section.fieldData[subsection].map(
                        (field) => {
                          return (
                            <DynamicInputField
                              fieldData={field}
                              width="30.05%"
                            />
                          );
                        },
                      )}
                    />
                  );
                })
              : section.fieldData.map((field) => {
                  if (field.element == 'input') {
                    return <DynamicInputField fieldData={field} />;
                  } else {
                    return <SelectField fieldData={field} />;
                  }
                })
          }
          style={
            section?.subsections
              ? {}
              : { paddingLeft: '3.3%', paddingRight: '3.3%' }
          }
        />
      </Suspense>
    );
  })}
</div> */
}
