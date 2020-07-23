import { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import styles from './auth.module.scss';

export default function AuthRegistrationComponent() {
  const firebase = useFirebase();

  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const createNewUser = async ({ email, password, username }) => {
    try {
      const newUser = await firebase.createUser(
        { email, password },
        { username, email }
      );
    } catch (err) {
      console.log('Error');
      console.log(err);

      setErrorMessage(err.message);
    }
  };

  return (
    <div className={styles.authComponent}>
      <h1>Register</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          console.log('Creating new user');
          createNewUser({
            email: newEmail,
            password: newPassword,
            username: newUsername,
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
          <label htmlFor="newUsername">Username</label>
          <input
            type="text"
            id="newUsername"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="username"
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
