import { configureStore } from '@reduxjs/toolkit';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'; // <- needed if using firestore

import counterReducer from '../lib/slices/counterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore
  },
  devTools: true,
});
