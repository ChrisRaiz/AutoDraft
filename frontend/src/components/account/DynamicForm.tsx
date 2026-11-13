import LoginForm from './login/LoginForm';
import SignUpForm from './signUp/SignUpForm';

type FormTypes = 'login' | 'user' | 'team';

const DynamicForm = ({
  type,
  next,
}: {
  type: { value: FormTypes; setter: Function };
  next: Function;
}) => {
  if (type.value == 'login') {
    return <LoginForm />;
  } else {
    return <SignUpForm type={type} next={next} />;
  }
};

export default DynamicForm;
