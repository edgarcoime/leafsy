import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

// Firebase
// import app from "../firebase/firebase";

export const AuthContext = createContext();

export function useUserCredentials() {
  return useContext(AuthContext);
}

export default function AuthContextProvider({ children }) {
  const localMongoUser =
    JSON.parse(localStorage.getItem("mongoUserData")) || null;
  const [googleCred, setGoogleCred] = useState(null);
  const [mongoCred, setMongoCred] = useState(localMongoUser);
  const [errors, setErrors] = useState({
    mongoErrors: null,
    firebaseErrors: null,
    clientErrors: null,
  });

  // New user Schema
  const [currentUser, setCurrentUser] = useState({
    google: null,
    mongo: localMongoUser,
    isLoading: false,
    isAuthenticated: false,
  });

  useEffect(() => {
    console.log("Running useEffect");
    app.auth().onAuthStateChanged((user) => {
      // setGoogleCred(user);
      // setCurrentUser({
      //   ...currentUser,
      //   google: user
      // })

      // // If user is no longer Authorized removes mongo local storage
      // if (!user) {
      //   setMongoCred(null);
      //   localStorage.removeItem("mongoUserData");
      //   setCurrentUser({
      //     ...currentUser,
      //     isAuthenticated: false,
      //     mongo: null
      //   })
      // }
      setGoogleCred(user);
      if (user) {
        setCurrentUser({
          ...currentUser,
          google: user,
          isAuthenticated: true,
        });
      } else {
        localStorage.removeItem("mongoUserData");
        setCurrentUser({
          ...currentUser,
          google: user,
          isAuthenticated: false,
        });
        setMongoCred(null);
      }
    });
  }, [googleCred]);

  const loginUser = async ({ email, password }) => {
    try {
      // Set loading
      setCurrentUser({
        ...currentUser,
        isLoading: true,
      });

      // Login User through firebase
      const response = await app
        .auth()
        .signInWithEmailAndPassword(email, password);

      // fetch userData from mongoDB
      const payload = { googleId: response.user.uid };
      const mongoResponse = await axios({
        method: "post",
        url: "http://localhost:5000/api/user/get",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
        data: payload,
      });

      // New Logic
      setCurrentUser({
        ...currentUser,
        isLoading: false,
        isAuthenticated: true,
      });

      // Sets mongoDB user into context and local storage
      setMongoCred(mongoResponse.data);
      localStorage.setItem("mongoUserData", JSON.stringify(mongoResponse.data));
    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = async (user) => {
    const {
      storeName,
      storeAddress,
      email,
      password,
      firstName,
      middleName,
      lastName,
    } = user;
    try {
      // Set loading
      setCurrentUser({
        ...currentUser,
        isLoading: true,
      });

      // Register user using fireBase
      const response = await app
        .auth()
        .createUserWithEmailAndPassword(email, password);

      // When register is succesful create mongoUser
      const payload = {
        storeName,
        storeAddress,
        email,
        firstName,
        middleName,
        lastName,
        googleId: response.user.uid,
      };
      const mongoResponse = await axios({
        method: "post",
        url: "http://localhost:5000/api/user",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
        data: payload,
      });
      const { msg, user: mongoUser } = mongoResponse.data;
      const userToSave = { ...mongoUser, googleId: response.user.uid };

      // New set User
      setCurrentUser({
        ...currentUser,
        isLoading: false,
        isAuthenticated: true,
        google: response.user,
        mongo: userToSave
      });

      // Sets mongoDB user into context and local storage
      setMongoCred(userToSave);
      localStorage.setItem("mongoUserData", JSON.stringify(userToSave));
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = async () => {
    console.log("Logging out user");
    try {
      // Logs out current firebaseAuth user
      const response = await app.auth().signOut();
      setCurrentUser({
        ...currentUser,
        google: null,
        mongo: null,
        isAuthenticated: false
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AuthContext.Provider
        value={{
          googleCred,
          mongoCred,
          errors,
          loginUser,
          registerUser,
          logoutUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
}
