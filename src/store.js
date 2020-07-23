import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  getFirebase,
  firebaseReducer,
  actionTypes as rrfActionTypes,
} from 'react-redux-firebase';
import { firestoreReducer, constants as rfConstants } from 'redux-firestore';

import counterReducer from '../lib/slices/counterSlice';

const extraArgument = {
  getFirebase,
};

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        // just ignore every redux-firebase and react-redux-firebase action type
        ...Object.keys(rfConstants.actionTypes).map(
          (type) => `${rfConstants.actionsPrefix}/${type}`
        ),
        ...Object.keys(rrfActionTypes).map(
          (type) => `@@reactReduxFirebase/${type}`
        ),
      ],
      ignoredPaths: ['firebase', 'firestore'],
    },
    thunk: {
      extraArgument,
    },
  }),
];

export default configureStore({
  reducer: {
    counter: counterReducer,
    firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore
  },
  middleware,
  devTools: true,
});
