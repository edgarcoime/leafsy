import React, { useState } from "react";
import LoginInput from "../login-register-input-box-component/login.and.register.input.box";
import "./login.form.component.css";
import { useFirebase, useFirestore } from "react-redux-firebase"

import { NavLink, useHistory } from "react-router-dom";

function LoginForm(props) {
  let history = useHistory();
  const firebase = useFirebase();
  const firestore = useFirestore();
  const INITIAL_STATE = {
    email: "",
    storeAddress: "",
    storeName: "",
    password: "",
    confirmPassword: "",
  };
  const [user, setUser] = useState(INITIAL_STATE);

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  }

  const { email, storeName, storeAddress, password, confirmPassword } = user;

  function submitHandler(e) {
    
    e.preventDefault();
  }

  const signUpHandler = async () => {
    if (password !== confirmPassword || password === "") {
      alert("pass dont match");
      return;
    } else {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log(response.user)
      const userId = response.user.uid

      const firestoreResponse = await firestore
        .collection("users")
        .doc(userId)
        .set({
          email,
          storeAddress,
          storeName,
          recommendations: [],
          orders: [],
        })
      console.log(firestoreResponse)
      setUser(INITIAL_STATE);
      history.push("/registration-confirmation")
    }
  };

  return (
    <form className="login100-form validate-form" onSubmit={submitHandler}>
      <span className="login100-form-title p-b-43">{props.title}</span>

      <LoginInput
        type="email"
        name="email"
        label="Email"
        dataValidate="Valid email is required: ex@abc.xyz"
        onChange={handleChange}
        value={email}
      />

      <LoginInput
        type="text"
        name="storeName"
        label="Business Name"
        dataValidate=""
        onChange={handleChange}
        value={storeName}
      />

      <LoginInput
        type="text"
        name="storeAddress"
        label="Business Address"
        dataValidate=""
        onChange={handleChange}
        value={storeAddress}
      />

      <LoginInput
        type="password"
        name="password"
        label="Password"
        dataValidate="Password is required"
        onChange={handleChange}
        value={password}
      />

      <LoginInput
        type="password"
        name="confirmPassword"
        label="Re-enter Password"
        dataValidate="Password is required"
        onChange={handleChange}
        value={confirmPassword}
      />

      <div className="flex-sb-m w-full p-t-3 p-b-32">
        <div className="contact100-form-checkbox">
          <NavLink to="/login" className="txt1 login-page">
            {props.backPage}
          </NavLink>
        </div>

        <div>
          <NavLink to="/recover" className="txt1 login-page">
            Forgot Password?
          </NavLink>
        </div>
      </div>

      <div className="container-login100-form-btn">
        <button className="login100-form-btn" onClick={signUpHandler}>
          {props.currentPage}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
