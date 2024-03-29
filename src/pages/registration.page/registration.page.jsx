import React from "react";
import RegisterForm from "../../components/login-form-component/register.form.component";

import register from "./registrationImages/ikidhimase-YQdurs9yQHE-unsplash.jpg";
import "../login.page/Login_v18/loginCSS/util.css";
import "../login.page/Login_v18/loginCSS/login.page.css";
import '../../App.css';
import "./registration.page.css";

const signupStyles = { backgroundImage: `url(${register})` };

function RegistrationPage() {


  return (
    <div className="registration">
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <RegisterForm
              signinState={false}
              route="/"
              title="Create A New Account"
              currentPage="Signup"
              backPage="Login"
              formId="registration-form-component"
            />

            <div className="login100-more" style={signupStyles}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
