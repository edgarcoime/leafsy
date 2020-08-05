import React, { useState } from "react";
import backgroundImage from "./recoverPasswordImages/foodism360-i7vNHehGCPg-unsplash.jpg";
import "./recover.password.css";

import { useFirebase } from "react-redux-firebase";

const pageStyles = { backgroundImage: `url(${backgroundImage})` };

function RecoverPasswordPage() {
  const firebase = useFirebase();
  const [email, setEmail] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await firebase.auth().sendPasswordResetEmail(email);
      console.log(response)
      
      setSuccess(true);
      setTimeout(() => {setSuccess(false)}, 5000);
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div style={pageStyles} className="background">
      <div className="card forgot-password-container">
        <h3>Password Reset</h3>

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <hr />
            <label htmlFor="email">Enter your email.</label>
            <input
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
              type="text"
              className="form-control"
              id="email"
              placeholder="Email"
            />
          </div>

          <button className="btn btn-primary">Reset Password</button>
        </form>
        {error ? <p>{error.message}</p> : null}
      </div>
    </div>
  );
}

export default RecoverPasswordPage;
