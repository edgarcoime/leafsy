import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// Components
import LoginInput from "../login-register-input-box-component/login.and.register.input.box";
import "./login.form.component.css";

// Redux-Firebase
import { useFirebase } from "react-redux-firebase";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const firebase = useFirebase();

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const loginWithEmail = async (e) => {
    const user = { email, password };
    console.log(user);
    console.log("Signing in with Email and password");
    const response = await firebase.login({
      email,
      password,
    });
    console.log(response)
    setEmail("");
    setPassword("");
  };

  const signinWithGoogle = () => {
    console.log("signing in with google");
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then(() => {
        console.log("User is signed in");
      });
  };

  return (
    <>
      <form className="login100-form validate-form" onSubmit={onSubmit}>
        <span className="login100-form-title p-b-43">{props.title}</span>

        <LoginInput
          type="email"
          name="email"
          label="Email"
          dataValidate="Valid email is required: ex@abc.xyz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <LoginInput
          type="password"
          name="password"
          label="Password"
          dataValidate="Password is required"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex-sb-m w-full p-t-3 p-b-32">
          <div className="contact100-form-checkbox">
            <NavLink to={props.route} className="txt1 login-page">
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
          <button
            type="submit"
            onClick={loginWithEmail}
            className="login100-form-btn"
          >
            {props.currentPage}
          </button>
        </div>
        <div className="container-login100-form-btn">
          <button
            type="submit"
            onClick={signinWithGoogle}
            className="login100-form-btn"
          >
            Sign in with Google
          </button>
        </div>
      </form>
      {/* <button onClick={logoutUser}>Logout</button> */}
    </>
  );
}

export default LoginForm;
