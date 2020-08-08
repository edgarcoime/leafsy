import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress"

// Firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";

// Redux
import { createStore } from "redux";
import { Provider, useSelector } from "react-redux";
import { ReactReduxFirebaseProvider, isLoaded } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { rootReducer } from "./redux/reducer";
import { composeWithDevTools } from "redux-devtools-extension";

// Leafsy
const firebaseConfig = {
  apiKey: "AIzaSyDgBTScywS5QGseNB0b58zz9mudVJQd_3A",
  authDomain: "leafsy-9ecd4.firebaseapp.com",
  databaseURL: "https://leafsy-9ecd4.firebaseio.com",
  projectId: "leafsy-9ecd4",
  storageBucket: "leafsy-9ecd4.appspot.com",
  messagingSenderId: "96362265288",
  appId: "1:96362265288:web:0eb1c83e893fec6259c3fd",
  measurementId: "G-YHXKQZZXXB",
};

// React Redux Firebase config for options
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  enableClaims: true,
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const initialState = {};
const store = createStore(rootReducer, initialState, composeWithDevTools());

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <div><CircularProgress className="loading" /></div>;
  return children;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <AuthIsLoaded>
            <App />
          </AuthIsLoaded>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
