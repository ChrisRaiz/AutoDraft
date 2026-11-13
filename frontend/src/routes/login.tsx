import { useState } from 'react';
import LoginImage from '../data/assets/login-image-2132x1311.png';
import { ReactComponent as DividerLine } from '../data/assets/horizontal-divider-217x3.svg';
import { ReactComponent as AutoDraftLogo } from '../data/assets/logo-title-56x56.svg';
import DynamicForm from '@/components/account/DynamicForm';
import DynamicTitle from '@/components/account/DynamicTitle';
import styles from './login.module.css';

// interface ISignUpValid {
//   firstName: boolean;
//   lastName: boolean;
//   email: boolean;
//   phone: boolean;
//   password: boolean;
// }

// interface IVisibility {
//   type: 'password' | 'text';
//   isVisible: boolean;
//   icon: ReactElement<SVGElement>;
// }

// interface IUserData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   password: string;
// }

// interface ITeamData {
//   teamName: string;
//   packageName: 'free' | 'bronze' | 'silver' | 'gold' | 'platinum';
//   packageFrequency: 'monthly' | 'annually';
// }

type FormTypes = 'login' | 'user' | 'team';

// const LoginForm = () => {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [isValid, setValid] = useState<ILoginValid>({
//     email: true,
//     password: true,
//   });
//   const navigate = useNavigate();

//   function handleEmailChange(value: string) {
//     setEmail(value);
//   }

//   function handlePasswordChange(value: string) {
//     setPassword(value);
//   }

//   async function handleSubmit() {
//     console.log('Begin execution of handleSubmit()');
//     if (!email || !isValid.email || !password || !isValid.password) {
//       console.warn('Email or Password is invalid.');
//       return;
//     }

//     const res = await authenticateCredentials(email, password);

//     console.log('Axios request complete! Res:', res);

//     if (res.status == 200) {
//       console.log('Valid status! res.status:', res.status);
//       navigate('/');
//     } else {
//       console.log('Invalid status! res.status:', res.status);
//       console.warn('Email or Password is incorrect.');
//     }
//   }

//   const visibilityProps: { hidden: IVisibility; visible: IVisibility } = {
//     hidden: {
//       type: 'password',
//       isVisible: false,
//       icon: (
//         <VisibleInputIcon
//           className={clsx(styles.visibilityIcon, styles.visibleInputIcon)}
//         />
//       ),
//     },
//     visible: {
//       type: 'text',
//       isVisible: true,
//       icon: (
//         <HiddenInputIcon
//           className={clsx(styles.visibilityIcon, styles.hiddenInputIcon)}
//         />
//       ),
//     },
//   };
//   const [visibility, setVisibility] = useState<'password' | 'text'>('password');

//   function handleVisibleChange() {
//     visibility == 'password'
//       ? setVisibility('text')
//       : setVisibility('password');
//   }

//   return (
//     <div className={styles.loginContentContainer}>
//       <form className={styles.loginForm}>
//         <label className={styles.fieldLabel}>
//           Email
//           <div className={styles.inputFieldContainer}>
//             <input
//               className={styles.inputField}
//               type={'email'}
//               required={true}
//               value={email}
//               onChange={(e) => handleEmailChange(e.target.value)}
//             />
//           </div>
//         </label>
//         <div className={styles.inputFieldContainer}>
//           <label className={styles.fieldLabel}>
//             Password
//             <div className={clsx(styles.passwordInputContainer)}>
//               <input
//                 className={clsx(styles.inputField, styles.passwordInput)}
//                 type={visibility}
//                 required={true}
//                 value={password}
//                 onChange={(e) => handlePasswordChange(e.target.value)}
//               />
//               <button
//                 type="button"
//                 className={styles.visibilityButton}
//                 onClick={() => handleVisibleChange()}
//               >
//                 {visibility == 'password'
//                   ? visibilityProps.hidden.icon
//                   : visibilityProps.visible.icon}
//               </button>
//             </div>
//           </label>
//         </div>
//       </form>
//       <div className={styles.optionsContainer}>
//         <PersistLogin />
//         <ForgotPassword />
//       </div>
//       <button
//         type="submit"
//         className={styles.submitButton}
//         onClick={() => handleSubmit()}
//       >
//         Log In
//       </button>
//     </div>
//   );
// };

// const CreateUserForm = ({
//   userData,
//   type,
//   next,
// }: {
//   userData: { value: IUserData; setter: Function };
//   type: { value: FormTypes; setter: Function };
//   next: Function;
// }) => {
//   const [isValid, setValid] = useState<ISignUpValid>({
//     firstName: true,
//     lastName: true,
//     email: true,
//     phone: true,
//     password: true,
//   });

//   const visibilityProps: { hidden: IVisibility; visible: IVisibility } = {
//     hidden: {
//       type: 'password',
//       isVisible: false,
//       icon: (
//         <VisibleInputIcon
//           className={clsx(styles.visibilityIcon, styles.visibleInputIcon)}
//         />
//       ),
//     },
//     visible: {
//       type: 'text',
//       isVisible: true,
//       icon: (
//         <HiddenInputIcon
//           className={clsx(styles.visibilityIcon, styles.hiddenInputIcon)}
//         />
//       ),
//     },
//   };
//   const [visibility, setVisibility] = useState<'password' | 'text'>('password');

//   function handleVisibleChange() {
//     visibility == 'password'
//       ? setVisibility('text')
//       : setVisibility('password');
//   }

//   async function nextForm(email: string) {
//     const res = await checkUserEmailAvailable(email);
//     if (!res.available) {
//       setValid({ ...isValid, email: false });
//     } else {
//       setValid({ ...isValid, email: true });
//       next();
//     }
//   }

//   return (
//     <div className={styles.loginContentContainer}>
//       <form className={styles.loginForm}>
//         <div className={styles.nameInputsContainer}>
//           <label className={styles.fieldLabel}>
//             First Name
//             <div className={styles.inputFieldContainer}>
//               <input
//                 className={styles.inputField}
//                 type={'text'}
//                 required={true}
//                 value={userData.value.firstName}
//                 onChange={(e) => userData.setter('firstName', e.target.value)}
//               />
//             </div>
//           </label>
//           <label className={styles.fieldLabel}>
//             Last Name
//             <div className={styles.inputFieldContainer}>
//               <input
//                 className={styles.inputField}
//                 type={'text'}
//                 required={true}
//                 value={userData.value.lastName}
//                 onChange={(e) => userData.setter('lastName', e.target.value)}
//               />
//             </div>
//           </label>
//         </div>
//         <label
//           className={
//             isValid.email
//               ? styles.fieldLabel
//               : clsx(styles.fieldLabel, styles.invalidFieldLabel)
//           }
//         >
//           Email
//           <div className={styles.inputFieldContainer}>
//             <input
//               className={
//                 isValid.email
//                   ? styles.inputField
//                   : clsx(styles.inputField, styles.invalidInputField)
//               }
//               type={'email'}
//               required={true}
//               value={userData.value.email}
//               onChange={(e) => userData.setter('email', e.target.value)}
//             />
//           </div>
//         </label>
//         <label className={styles.fieldLabel}>
//           Phone
//           <div className={styles.inputFieldContainer}>
//             <input
//               className={styles.inputField}
//               type={'tel'}
//               required={true}
//               value={userData.value.phone}
//               onChange={(e) => userData.setter('phone', e.target.value)}
//             />
//           </div>
//         </label>
//         <div className={styles.inputFieldContainer}>
//           <label className={styles.fieldLabel}>
//             Password
//             <div className={clsx(styles.passwordInputContainer)}>
//               <input
//                 className={clsx(styles.inputField, styles.passwordInput)}
//                 type={visibility}
//                 required={true}
//                 value={userData.value.password}
//                 onChange={(e) => userData.setter('password', e.target.value)}
//               />
//               <button
//                 type="button"
//                 className={styles.visibilityButton}
//                 onClick={() => handleVisibleChange()}
//               >
//                 {visibility == 'password'
//                   ? visibilityProps.hidden.icon
//                   : visibilityProps.visible.icon}
//               </button>
//             </div>
//           </label>
//         </div>
//       </form>
//       <button
//         type="button"
//         className={styles.submitButton}
//         onClick={() => nextForm(userData.value.email)}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// const CreateTeamForm = ({
//   teamData,
//   type,
//   next,
// }: {
//   teamData: { value: ITeamData; setter: Function };
//   type: { value: FormTypes; setter: Function };
//   next: Function;
// }) => {
//   const [isValid, setValid] = useState<{
//     teamName: {
//       valid: boolean;
//       error: string | null;
//     };
//     packageName: {
//       valid: boolean;
//       error: string | null;
//     };
//     packageFrequency: {
//       valid: boolean;
//       error: string | null;
//     };
//   }>({
//     teamName: {
//       valid: true,
//       error: '',
//     },
//     packageName: {
//       valid: true,
//       error: '',
//     },
//     packageFrequency: {
//       valid: true,
//       error: '',
//     },
//   });

//   async function nextForm(email: string) {
//     const res = await checkTeamNameAvailable(email);
//     if (!res.available) {
//       setValid({
//         ...isValid,
//         teamName: { valid: false, error: 'Team name is already taken' },
//       });
//     } else {
//       setValid({ ...isValid, teamName: { valid: true, error: null } });
//       next();
//     }
//   }

//   return (
//     <div className={styles.userInputContainer}>
//       <label
//         className={
//           isValid.teamName.valid
//             ? styles.fieldLabel
//             : clsx(styles.fieldLabel, styles.invalidFieldLabel)
//         }
//       >
//         Team Name
//         <div className={styles.inputFieldContainer}>
//           <input
//             className={
//               isValid.teamName.valid
//                 ? styles.inputField
//                 : clsx(styles.inputField, styles.invalidInputField)
//             }
//             type={'text'}
//             required={true}
//             value={teamData.value.teamName}
//             onChange={(e) => teamData.setter('teamName', e.target.value)}
//           />
//         </div>
//         {isValid.teamName.valid ? null : (
//           <p className={styles.errorMessage}>{isValid.teamName.error}</p>
//         )}
//       </label>
//       <label className={styles.fieldLabel}>
//         Package
//         <div className={styles.inputFieldContainer}>
//           <select
//             className={styles.selectField}
//             required={true}
//             value={teamData.value.packageName}
//             onChange={(e) => teamData.setter('packageName', e.target.value)}
//           >
//             <option value="free">Free</option>
//             <option value="bronze">Bronze</option>
//             <option value="silver">Silver</option>
//             <option value="gold">Gold</option>
//             <option value="platinum">Platinum</option>
//           </select>
//         </div>
//       </label>
//       <label className={styles.fieldLabel}>
//         Payment Frequency
//         <div className={styles.inputFieldContainer}>
//           <select
//             className={styles.selectField}
//             required={true}
//             value={teamData.value.packageFrequency}
//             onChange={(e) =>
//               teamData.setter('packageFrequency', e.target.value)
//             }
//           >
//             <option value="monthly">Monthly</option>
//             <option value="annually">Annually</option>
//           </select>
//         </div>
//       </label>
//       <button
//         // type="submit"
//         className={styles.submitButton}
//         onClick={() => nextForm(teamData.value.teamName)}
//       >
//         Sign Up
//       </button>
//     </div>
//   );
// };

// const PersistLogin = () => {
//   const persistLoginId = useId();
//   return (
//     <label htmlFor={persistLoginId} className={styles.persistLoginText}>
//       <input
//         type="checkbox"
//         id={persistLoginId}
//         name="persistLogin"
//         className={styles.persistLoginCheckbox}
//       />
//       <span className={styles.artificialTextbox}>
//         <span className={styles.innerArtificialBox}></span>
//       </span>
//       Remember Me
//     </label>
//   );
// };

// const ForgotPassword = () => {
//   // Add backend call for password reset here
//   return (
//     <button className={styles.forgotPasswordButton}>
//       Forgot Your Password?
//     </button>
//   );
// };

// const DynamicForm = ({
//   type,
//   next,
// }: {
//   type: { value: FormTypes; setter: Function };
//   next: Function;
// }) => {
//   if (type.value == 'login') {
//     return <LoginForm />;
//   } else {
//     return <SignUpForm type={type} next={next} />;
//   }
// };

// const DynamicTitle = ({ type }: { type: FormTypes }) => {
//   if (type == 'login') {
//     return (
//       <div className={styles.titleContainer}>
//         <h1 className={styles.titleText}>Welcome Back</h1>
//         <p className={styles.subtitleText}>
//           Enter your email and password to access your account
//         </p>
//       </div>
//     );
//   } else {
//     const subtitle = type == 'user' ? 'User' : 'Team';

//     return (
//       <div className={styles.titleContainer}>
//         <h1 className={styles.titleText}>Create Account</h1>
//         <p className={styles.subtitleText}>{subtitle} Information</p>
//       </div>
//     );
//   }
// };

// const SignUpForm = ({
//   type,
//   next,
// }: {
//   type: { value: FormTypes; setter: Function };
//   next: Function;
// }) => {
//   const [userData, setUserData] = useState<{
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     password: string;
//   }>({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     password: '',
//   });

//   function checkEmailAvailable(email: string) {}

//   function checkTeamNameAvailable(name: string) {}

//   function handleUserDataChange(
//     field: 'firstName' | 'lastName' | 'email' | 'phone' | 'password',
//     value: string,
//   ) {
//     setUserData({ ...userData, [field]: value });
//   }

//   const [teamData, setTeamData] = useState<{
//     teamName: string;
//     packageName: 'free' | 'bronze' | 'silver' | 'gold' | 'platinum';
//     packageFrequency: 'monthly' | 'annually';
//   }>({
//     teamName: '',
//     packageName: 'free',
//     packageFrequency: 'annually',
//   });

//   function handleTeamDataChange(
//     field: 'teamName' | 'packageName' | 'packageFrequency',
//     value: string,
//   ) {
//     setTeamData({ ...teamData, [field]: value });
//   }

//   async function handleSubmit() {
//     console.log('Begin execution of handleSubmit()');
//     if (
//       !userData.firstName ||
//       !userData.lastName ||
//       !userData.email ||
//       !userData.phone ||
//       !userData.password
//     ) {
//       console.warn('Invalid user data');
//       return;
//     }

//     if (
//       !teamData.teamName ||
//       !teamData.packageName ||
//       !teamData.packageFrequency
//     ) {
//       console.warn('Invalid team data');
//       return;
//     }

//     const res = await createAccount(
//       userData.firstName,
//       userData.lastName,
//       userData.email,
//       userData.phone,
//       userData.password,
//       teamData.teamName,
//       teamData.packageName,
//       teamData.packageFrequency,
//     );

//     console.log('Axios request complete! Res:', res);

//     if (res.status == 201) {
//       console.log('Valid status! res.status:', res.status);
//       type.setter('login');
//     } else {
//       console.log('res:', res);
//       console.log('Invalid status! res.status:', res.status);
//       console.warn('res.message:', res.message);
//     }
//   }

//   if (type.value == 'user') {
//     return (
//       <CreateUserForm
//         userData={{ value: userData, setter: handleUserDataChange }}
//         type={type}
//         next={next}
//       />
//     );
//   } else {
//     return (
//       <CreateTeamForm
//         teamData={{ value: teamData, setter: handleTeamDataChange }}
//         type={type}
//         next={handleSubmit}
//       />
//     );
//   }
// };

const Login = () => {
  const [formType, setFormType] = useState<FormTypes>('login');

  const secondaryButtonProps = {
    login: {
      label: 'Sign Up',
      onClick: handleChangeForm,
    },
    user: {
      label: 'Login',
      onClick: handleChangeForm,
    },
    team: {
      label: 'Return',
      onClick: handleChangeForm,
    },
  };

  // Handles secondary form navigation
  function handleChangeForm(type?: 'login' | 'user' | 'team' | undefined) {
    if (type) setFormType(type);
    if (formType == 'user') {
      setFormType('login');
    } else {
      setFormType('user');
    }
  }

  // Handles changing to the next form in a form set
  function handleNextForm() {
    if (formType == 'user') setFormType('team');
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.leftContentContainer}>
        <div className={styles.leftContentTrim}>
          <div className={styles.leftContentBackground}>
            <header className={styles.companyContainer}>
              <AutoDraftLogo className={styles.companyLogo} />
              <h2 className={styles.companyText}>AutoDraft</h2>
            </header>
            <div className={styles.loginContainer}>
              <DynamicTitle type={formType} />
              <div className={styles.actionContainer}>
                <DynamicForm
                  type={{ value: formType, setter: handleChangeForm }}
                  next={handleNextForm}
                />
                <div className={styles.dividerContainer}>
                  <DividerLine />
                  <p className={styles.dividerText}>Or</p>
                  <DividerLine />
                </div>
                <button
                  className={styles.signUpButton}
                  onClick={() => handleChangeForm()}
                >
                  {secondaryButtonProps[formType].label}
                </button>
              </div>
            </div>
            <footer className={styles.footerContainer}>
              <p className={styles.privacyNoticeText}>Privacy Notice</p>
              <p className={styles.copyrightText}>
                Copyright 2025 AutoDraft Corporation
              </p>
            </footer>
          </div>
        </div>
      </div>
      <div className={styles.rightContentContainer}>
        <div className={styles.informationContainer}>
          <h2 className={styles.informationText}>
            Effortlessly manage your client
            <br />
            files and team operations
          </h2>
          <p className={styles.informationSubText}>
            Log in to access your document generations and manage your team
          </p>
        </div>
        <img src={LoginImage} className={styles.loginImage} />
      </div>
    </div>
  );
};

export default Login;
