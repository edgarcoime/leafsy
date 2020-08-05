import React from "react";
import RegisterForm from "../../components/login-form-component/google.form.component";

import register from "./registrationImages/ikidhimase-YQdurs9yQHE-unsplash.jpg";
import "../login.page/Login_v18/loginCSS/util.css";
import "../login.page/Login_v18/loginCSS/login.page.css";

const signupStyles = { backgroundImage: `url(${register})` };

function RegistrationPage() {
  return (
    <div>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <RegisterForm
              signinState={false}
              route="/"
              title="Hello! Enter your store info."
              currentPage="Signup"
              backPage="Login"
            />

            <div className="login100-more" style={signupStyles}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
