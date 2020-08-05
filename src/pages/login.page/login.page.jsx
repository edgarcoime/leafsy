import React from "react";
import login from "./Login_v18/loginImages/jasmin-chew-honUtKJIqcE-unsplash.jpg";

import "./Login_v18/loginCSS/util.css";
import "./Login_v18/loginCSS/login.page.css";

// Components
import LoginForm from "../../components/login-form-component/login.form.component";

const signinStyles = { backgroundImage: `url(${login})` };

function LoginPage() {
  return (
    <div>

      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <LoginForm 
							signinState={true} 
							route="/register"
							title="Login To Continue"
							currentPage="Login"
							backPage="Signup"

						/>

            <div className="login100-more" style={signinStyles}></div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default LoginPage;
