import { useFirebase } from 'react-redux-firebase';
import AuthRegistrationComponent from '../components/register';

const RegisterPage = () => {
  const firebase = useFirebase();

  const currentUser = firebase.auth().currentUser;

  console.log(currentUser);

  return (
    <>
      {currentUser ? <p>Already signed in</p> : <AuthRegistrationComponent />}
    </>
  );
};

export default RegisterPage;
