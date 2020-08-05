import { getDefaultMiddleware, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

// Import slices

// React-redux-firebase
import { firebaseReducer } from "react-redux-firebase"
import { firestoreReducer } from "redux-firestore";

// Exporting slice actions

// Setting reducer
const reducer = {
  firebase: firebaseReducer,
  firestore: firestoreReducer,
};

const middleware = [ ...getDefaultMiddleware(), logger ];

export default configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production"
});