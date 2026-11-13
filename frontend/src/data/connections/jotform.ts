import Jotform from 'jotform';
import { getJotFormKey } from '@/data/ipc/messages';
import Submission from 'jotform/dist/submission';
import { JotformResponse } from 'jotform/dist/types/response';

const client = connectJotform();

async function getAPIKey() {
  let key: string = '';
  console.log('Attempting to retrieve the Jotform API key');
  try {
    await getJotFormKey().then((res: string) => (key = res));
  } catch (err) {
    throw new Error(
      `An error has occurred while retrieving the Jotform API key\n${err}`,
    );
  }
  console.log('Successfully retrieved the Jotform API key');
  return key;
}

async function connectJotform() {
  const API_KEY = await getAPIKey();
  console.log(
    `Attempting to connect to the Jotform client via the api key: ${API_KEY}`,
  );
  try {
    const clientPromise = new Jotform(API_KEY);
    console.log('Successfully connected to the Jotform client!');
    return clientPromise;
  } catch (err) {
    console.error(
      `Failed to connect to the Jotform client via the api key: ${API_KEY}`,
      err,
    );
  }
}

export async function getJotformUser() {
  let userInfo;
  console.log('Attempting to retrieve Jotform user data');
  try {
    await client
      .then((res) => (userInfo = res?.user.get()))
      .catch((err) =>
        console.error(
          `An error has occurred while retrieving Jotform user data.\n${err}`,
        ),
      );
    console.log('Successfully retrieved Jotform user data!');
    return userInfo;
  } catch (err) {
    throw new Error(
      `An error has occurred while retrieving Jotform user data.\n${err}`,
    );
  }
}

export async function getFormQuestions(id: string) {
  let formQuestions;
  console.log(`Attempting to retrieve Jotform questions for form ${id}`);
  try {
    await client
      .then((res) => (formQuestions = res?.form.getQuestions(id)))
      .catch((err) =>
        console.error(
          `An error has occurred while retrieving Jotform questions for form ${id}\n${err}`,
        ),
      );
    console.log(`Successfully retrieved Jotform questions for form ${id}`);
  } catch (err) {
    throw new Error(
      `An error has occurred while retrieving the Jotform questions for form ${id}\n${err}`,
    );
  }

  return formQuestions;
}

export async function getFormSubmissions(id: string, user?: string) {
  let submissionData;
  console.log(
    `Attempting to retrieve Jotform submissions for form ${id}\nFiltered for user ${user || 'none'}`,
  );
  try {
    await client
      .then(
        (res) =>
          (submissionData = res?.form.getSubmissions(id, {
            filter: JSON.stringify({ id: user }),
          })),
      )
      .catch((err) =>
        console.error(
          `An error has occurred while retrieving Jotform submissions for form ${id}\n${err}`,
        ),
      );
    console.log(`Successfully retrieved Jotform submissions for form ${id}`);
  } catch (err) {
    throw new Error(
      `An error has occurred while retrieving the Jotform submissions for form ${id}\n${err}`,
    );
  }

  return submissionData;
}

export async function postSubmission(id: string, data: any) {
  console.log(`Attempting to update submission ${id}`);
  try {
    await client
      .then((res) => res?.submission.edit(id, data))
      .catch((err) =>
        console.error(
          `An error has occurred while updating submission ${id}\n${err}`,
        ),
      );
    console.log(`Successfully updated submission ${id}`);
  } catch (err) {
    throw new Error(
      `An error has occurred while updating submission ${id}\n${err}`,
    );
  }
}

export async function deleteSubmission(id: string) {
  console.log(`Attempting to delete submission ${id}`);
  try {
    await client
      .then((res) => res?.submission.delete(id))
      .catch((err) =>
        console.error(
          `An error has occurred while deleting submission ${id}\n${err}`,
        ),
      );
    console.log(`Successfully deleted submission ${id}`);
  } catch (err) {
    throw new Error(
      `An error has occurred while deleting submission ${id}\n${err}`,
    );
  }
}

export default client;
