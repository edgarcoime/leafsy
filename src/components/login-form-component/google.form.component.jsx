import React, { useState } from "react";
import LoginInput from "../login-register-input-box-component/login.and.register.input.box";
import "./login.form.component.css";
import { NavLink } from "react-router-dom";

// MUI imports
import CircularProgress from "@material-ui/core/CircularProgress"

// firebase Redux
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
  

function LoginForm(props) {
  const firestore = useFirestore(); // Update user profile

  const currentUser = useSelector(state => (state.firebase.profile))


  // Checks to see if profile exists
  const isFullyLoaded = () => {
    if (!currentUser.isEmpty && currentUser.isLoaded) {
      return true
    } else {
      return false
    }
  }


  // Update User profile
  const updateProfile = async (newProfile) => {
    const userId = currentUser.token.claims.user_id
    console.log(userId)
    const response = await firestore
      .collection("users")
      .doc(userId)
      .update(newProfile)
    console.log(newProfile)
  }

  
  const [storeInfo, setStoreInfo] = useState({
    storeAddress: "",
    storeName: ""
  });




function handleChange(event) {
    const { name, value } = event.target;
    setStoreInfo((prevSetting) => {
      return {
        ...prevSetting,
        [name]: value,
      };
    });
  }

const submitSettings = (event) => {
    event.preventDefault();
    updateProfile(storeInfo)
}


  return isFullyLoaded() ? (
    <div className="login100-form validate-form">
      <span className="login100-form-title p-b-43">{props.title}</span>


      <LoginInput
        type="text"
        name="storeName"
        label="Business Name"
        dataValidate=""
        onChange={handleChange}
        value={storeInfo.storeName}
      />

      <LoginInput
        type="text"
        name="storeAddress"
        label="Business Address"
        dataValidate=""
        onChange={handleChange}
        value={storeInfo.storeAddress}
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
        <button className="login100-form-btn" onClick={submitSettings}>
          Submit
        </button>
      </div>
    </div>
  ) : <CircularProgress />

}

export default LoginForm;
