import { Provider } from 'react-redux';
import firebase from '../firebase/clientApp';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
createFirestoreInstance;
import { createFirestoreInstance } from 'redux-firestore';
import store from '../store';

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Component {...pageProps} />
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default MyApp;
