import { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import styles from './auth.module.scss';

export default function AuthRegistrationComponent({ redirectUrl }) {
  const firebase = useFirebase();

  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const createNewUser = async ({ email, password }) => {
    try {
      const newUser = await firebase.createUser({ email, password }, { email });

      console.log('newUser created');
      console.log(newUser);
      console.log(firebase.auth().currentUser);
    } catch (err) {
      console.log('Error');
      console.log(err);

      setErrorMessage(err.message);
    }
  };

  return (
    <div className={styles.authForm}>
      <h1>Register</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          console.log('Creating new user');
          createNewUser({
            email: newEmail,
            password: newPassword,
          });
        }}
      >
        <div>
          <label htmlFor="newEmail">Email</label>
          <input
            type="email"
            id="newEmail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="newPassword">Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="password"
          />
        </div>

        <input type="submit" value="Register" />
      </form>

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
}
