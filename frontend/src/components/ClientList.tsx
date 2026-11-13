import { SetStateAction, useState } from 'react';
import ClientRow from './ClientRow';
import clsx from 'clsx';
import styles from './ClientList.module.css';

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

const clientListData: IClientList[] = [
  {
    id: 0,
    clientId: '01',
    client: 'Brandon Raiz',
    lastSubmission: '12/02/2024',
    submissions: '4',
    email: 'braiz@jurishealth.law',
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
    client: 'Melody Montecinos',
    lastSubmission: '01/24/2025',
    submissions: '1',
    email: 'm&m@yahoo.com',
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
    client: 'Jordan Hermes',
    lastSubmission: '11/15/2024',
    submissions: '3',
    email: 'jhermes@gmail.com',
    phone: '(584) 555-3892',
    submissionData: [],
  },
  {
    id: 3,
    clientId: '04',
    client: 'Jennifer Raiz',
    lastSubmission: '02/03/2025',
    submissions: '2',
    email: 'jraiz@sundotkd.com',
    phone: '(630) 555-4093',
    submissionData: [],
  },
  {
    id: 4,
    clientId: '05',
    client: 'Gregory Johnson',
    lastSubmission: '08/04/2024',
    submissions: '6',
    email: 'gjohnson@yahoo.com',
    phone: '(776) 555-7392',
    submissionData: [],
  },
  {
    id: 5,
    clientId: '06',
    client: 'James Grullon',
    lastSubmission: '03/01/2025',
    submissions: '1',
    email: 'jamesg19@gmail.com',
    phone: '(902) 555-2890',
    submissionData: [],
  },
  {
    id: 6,
    clientId: '07',
    client: 'Larry Savage',
    lastSubmission: '01/29/2025',
    submissions: '2',
    email: 'savage42@hotmail.com',
    phone: '(284) 555-9538',
    submissionData: [],
  },
  {
    id: 7,
    clientId: '08',
    client: 'Jayson Cruz',
    lastSubmission: '11/05/2024',
    submissions: '12',
    email: 'jcruz@gmail.com',
    phone: '(932) 555-9283',
    submissionData: [],
  },
  {
    id: 8,
    clientId: '09',
    client: 'Stephen Gray',
    lastSubmission: '02/12/2024',
    submissions: '3',
    email: 'sgray@gmail.com',
    phone: '(483) 555-2843',
    submissionData: [],
  },
  {
    id: 9,
    clientId: '10',
    client: 'Valeria Evans',
    lastSubmission: '12/02/2023',
    submissions: '1',
    email: 'valeria342@yahoo.com',
    phone: '(943) 555-5938',
    submissionData: [],
  },
];

const ClientList = () => {
  const [sortBy, setSortBy] = useState<{
    category: string;
    order: 'ascending' | 'descending';
  }>({ category: 'id', order: 'ascending' });

  return (
    <div className={styles.selectionListContainer}>
      <div className={styles.selectionCategoriesContainer}>
        <button className={clsx(styles.sortButton, styles.idCategory)}>
          #
        </button>
        <button className={clsx(styles.sortButton, styles.clientCategory)}>
          Client
        </button>
        <button
          className={clsx(styles.sortButton, styles.lastSubmissionCategory)}
        >
          Last Submission
        </button>
        <button className={clsx(styles.sortButton, styles.submissionsCategory)}>
          Submissions
        </button>
        <button className={clsx(styles.sortButton, styles.emailCategory)}>
          Email
        </button>
        <button className={clsx(styles.sortButton, styles.phoneCategory)}>
          Phone
        </button>
        <button className={clsx(styles.sortButton, styles.selectedCategory)}>
          Selected
        </button>
        <button className={clsx(styles.sortButton, styles.actionsCategory)}>
          Actions
        </button>
      </div>
      <hr className={styles.rowDivider} />
      <div className={styles.listContainer}>
        {clientListData.map((client) => {
          return (
            <div>
              <ClientRow key={client.id} clientData={client} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClientList;
