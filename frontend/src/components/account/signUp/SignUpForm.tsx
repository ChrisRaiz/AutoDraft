import { useState } from 'react';
import { createAccount } from '@/data/ipc/messages';
import CreateUserForm from './CreateUserForm';
import CreateTeamForm from './CreateTeamForm';

type FormTypes = 'login' | 'user' | 'team';

const SignUpForm = ({
  type,
  next,
}: {
  type: { value: FormTypes; setter: Function };
  next: Function;
}) => {
  const [userData, setUserData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  function checkEmailAvailable(email: string) {}

  function checkTeamNameAvailable(name: string) {}

  function handleUserDataChange(
    field: 'firstName' | 'lastName' | 'email' | 'phone' | 'password',
    value: string,
  ) {
    setUserData({ ...userData, [field]: value });
  }

  const [teamData, setTeamData] = useState<{
    teamName: string;
    packageName: 'free' | 'bronze' | 'silver' | 'gold' | 'platinum';
    packageFrequency: 'monthly' | 'annually';
  }>({
    teamName: '',
    packageName: 'free',
    packageFrequency: 'annually',
  });

  function handleTeamDataChange(
    field: 'teamName' | 'packageName' | 'packageFrequency',
    value: string,
  ) {
    setTeamData({ ...teamData, [field]: value });
  }

  async function handleSubmit() {
    console.log('Begin execution of handleSubmit()');
    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.email ||
      !userData.phone ||
      !userData.password
    ) {
      console.warn('Invalid user data');
      return;
    }

    if (
      !teamData.teamName ||
      !teamData.packageName ||
      !teamData.packageFrequency
    ) {
      console.warn('Invalid team data');
      return;
    }

    const res = await createAccount(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.phone,
      userData.password,
      teamData.teamName,
      teamData.packageName,
      teamData.packageFrequency,
    );

    console.log('Axios request complete! Res:', res);

    if (res.status == 201) {
      console.log('Valid status! res.status:', res.status);
      type.setter('login');
    } else {
      console.log('res:', res);
      console.log('Invalid status! res.status:', res.status);
      console.warn('res.message:', res.message);
    }
  }

  if (type.value == 'user') {
    return (
      <CreateUserForm
        userData={{ value: userData, setter: handleUserDataChange }}
        type={type}
        next={next}
      />
    );
  } else {
    return (
      <CreateTeamForm
        teamData={{ value: teamData, setter: handleTeamDataChange }}
        type={type}
        next={handleSubmit}
      />
    );
  }
};

export default SignUpForm;
