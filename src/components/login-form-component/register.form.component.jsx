import React, { useState, useEffect } from "react";
import LoginInput from "../login-register-input-box-component/login.and.register.input.box";
import "./login.form.component.css";
import { useFirebase, useFirestore } from "react-redux-firebase"

import passwordValidator from "password-validator";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Alert } from "@material-ui/lab"

function LoginForm(props) {
  const passwordSchema = new passwordValidator();
  const authError = useSelector(state => state.firebase.authError);

  const history = useHistory();
  const firebase = useFirebase();
  const firestore = useFirestore();
  const INITIAL_STATE = {
    email: "",
    storeAddress: "",
    storeWebsite: "",
    storeName: "",
    password: "",
    confirmPassword: "",
    error: false,
    passwordError: false,
    customGenre: [
                    "Sci-fi",
                    "Thriller",
                    "Horror",
                    "Fantasy",
                    "Canadian Literature",
                    "Philosophy",
                    "Poetry",
                    "History",
                    "Non-fiction",
                    "Fiction",
                ],
  };
  const [user, setUser] = useState(INITIAL_STATE);
  const [registerError, setRegisterError] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });


  }



  const { email, storeName, storeAddress, password, confirmPassword, storeWebsite } = user;


  function submitHandler(e) {
    
    e.preventDefault();
  }


    // function that checks whether password strength is secure enough and it the passwords match
  // function is run in useEffect to refelect the change in state of password while the user types (onchange)
  function passwordError() {
    
    // if the password passes all the password security tests and is not empty the password error message will be empty
    if (/[0-9]/.test(password) && password.length >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password) || !password) {
      document.getElementById("password-error").innerHTML= "";

        // if the passwords do not match each other after passing all the security tests it will display message indicating mismatch
        if (password !== confirmPassword && confirmPassword && password) {
          document.getElementById("password-error").innerHTML = "Passwords don't match!"
        }

    }

    // if one of the password security tests fail it
    else {
      
          // passwrd doesn't contain an uppercase letter or lowercase letter
        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password )) {
          document.getElementById("password-error").innerHTML = "Password must contain an UPPERCASE and LOWERCASE letter.";
        }
        
        // password must contain a digit
        if (!/[0-9]/.test(password)) {
          document.getElementById("password-error").innerHTML = "you must include a NUMBER in your password.";
        } 

        // passowrd too short. must contain atleast 6 characters
        if (password.length < 6) {
          document.getElementById("password-error").innerHTML = "too short! password must have atleast 6 characters.";
        }
    }
  }


  // passwordError function will run whenever there is a state change
  useEffect(() => {
    passwordError();
    
  });


  // password validator schema
  passwordSchema
  .is().min(6)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)


  // handles the style changes/errors of the password input boxes as the user tries to submit the form while the password reqwuirements are not met (onclick)
  function passwordhandler() {

    let errorMessage = document.getElementById("password-error");
    let passwordBox = document.getElementById("password");
    let confirmPasswordBox = document.getElementById("password2");

    // if the passwords do not match, if the password boxes are left empty and if there is an error message stil for the password security 
    // rhe boxes will turn red indicating they need to be refilled
    if (password !== confirmPassword || !password && !confirmPassword || errorMessage.innerHTML) {
      
      passwordBox.style.borderColor = "red";
      confirmPasswordBox.style.borderColor = "red";
      
      // if the password entered passed all the security measures but has the errors from above if statement
      // this allows the user to still see why their password was invalid even after they press enter
      if (passwordSchema.validate(password)) {
        
        // resets the password input boxes to be empty strings only if the original password was valid but did not match the confirm passsword
        // sets passwordError state to true to indicate that passwords mismatch and show alert error message at the top of the screen (figure 1.)
        setUser((prevUser) => {
          return {
            ...prevUser,
            password: "",
            confirmPassword: "",
            passwordError: true
          };
        });
      }


      // if the passwords match and are not empty strings
    } else {

      // function that checks for password validity/security 
      // will display an error message if it is incorrect
      passwordError();

      // if there is no error message from the passwordError function
      // change the password input boxes back to their original colour
      if (errorMessage.innerHTML === "") {

        passwordBox.style.borderColor = "#e6e6e6";
        confirmPasswordBox.style.borderColor = "#e6e6e6";

        // set the passwordErrpr state back to false so the Alert error meessage will not display on the top of the screen (figure 1)
        setUser((prevUser) => {
          return {
            ...prevUser,
            passwordError: false
          };
        });
      }
    }

  };


  // handles the email input box style changes/errors (onclick)
  function emailHandler() {
    
    // if the entered email does not have the proper email format or is left empty the box becomes red
    if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      document.getElementById("email").style.borderColor = "red";
    }

    // when it is filled in correctly it goes back to its original colour
    else {
      document.getElementById("email").style.borderColor = "#e6e6e6";
    }
  };


  // registers the user into firebase
  const signUpHandler = async () => {

    try {
      // these functions will indicate which input fields are filled in incorrectly 
      passwordhandler();
      emailHandler();
  
  
  
      // if all the fields are filled in correctly and the passwords are valid the user can signup for a new account
      if (email && password === confirmPassword && passwordSchema.validate(password)) {
  
          // authenticates the user when all the required fields are filled in
          const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
  
          console.log(response.user)
          const userId = response.user.uid
  
          const firestoreResponse = await firestore
            .collection("users")
            .doc(userId)
            .set({
              deliveryRadius: 100,
              storeWebsite,
              email,
              storeAddress,
              storeName,
              recommendations: [],
              orders: [],
            })
          console.log(firestoreResponse);
          setUser(INITIAL_STATE);
  
          // firestore
          //   .collection("users")
          //   .doc(userId)
          //   .set({
          //     deliveryRadius: 100,
          //     storeWebsite,
          //     email,
          //     storeAddress,
          //     storeName,
          //     recommendations: [],
          //     orders: [],
          //   })
          //   .then(res => console.log(response))
          //   .catch(error => setRegisterError(error));
  
          // changes page to the confirmation page
          history.push("/registration-confirmation");
  
        
        // if the fields are not filed in correctly
      } else {
  
        // this resets the error state to false so if all the required fields are filled out, the Alert error mesage will disappear (figure 2.)

        setUser((prevUser) => {
          return {
            ...prevUser,
            error: false
          };
        });
  
        // if any of the required fields are left empty set error state to true the show alert error message at the top of the screen (figure 2.)
        if (!email || !password || !confirmPassword) {
  
          setUser((prevUser) => {
            return {
              ...prevUser,
              error: true
            };
          });
        }
      }
    } catch (error) {
      setRegisterError(error);
    }
  };

  return (
    <form className="login100-form validate-form" id={props.formId} onSubmit={submitHandler}>
      <span className="login100-form-title p-b-43">{props.title}</span>
      
      {/* figure 2. displays error message when a required field is left empty */}
      {user.error && <div><Alert severity="error">Please fill in all the required fields!</Alert><br /></div>}

      {/* figure 1. displays error message when passwords do not match after user submits form */}
      {user.passwordError && <div><Alert severity="error">Your passwords don't match! Try again!</Alert><br /></div>}

      {/* displays any authentication errors */}
      {authError && (
          <div>
            <Alert severity="error">{authError.message}</Alert><br />
          </div>
        )}

      {/* displays register error */}
      {registerError && (
        <div>
          <Alert severity="error">{registerError.message}</Alert>
        </div>
      )}

        <p><small>* Required fields</small></p>
      <LoginInput
        type="email"
        name="email"
        label="*Email"
        dataValidate="Valid email is required: ex@abc.xyz"
        onChange={handleChange}
        value={email}
        id="email"
        inputId="email-input"
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
        name="storeWebsite"
        label="Business Website"
        dataValidate=""
        onChange={handleChange}
        value={storeWebsite}
      />

      <LoginInput
        type="text"
        name="storeAddress"
        label="Business Address"
        dataValidate=""
        onChange={handleChange}
        value={storeAddress}
      />

      <p><small id="password-error"></small></p>
      <LoginInput
        type="password"
        name="password"
        label="*Password"
        dataValidate="Password is required"
        onChange={handleChange}
        value={password}
        id="password"
        inputId="passwordInp"
      />

      <LoginInput
        type="password"
        name="confirmPassword"
        label="*Re-enter Password"
        dataValidate="Password is required"
        onChange={handleChange}
        value={confirmPassword}
        id="password2"
        inputId="password2Inp"
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
