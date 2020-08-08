import React, { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";

function SecuritySettings() {
  const firebase = useFirebase();
  const currentUser = useSelector(state => state.firebase.auth);
  const [credential, setCredential] = useState(null);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [activeButton, setActiveButton] = useState(false);

  function handleChange(event) {
    setActiveButton(true);

    const { name, value } = event.target;
    setPassword((prevSetting) => {
      return {
        ...prevSetting,
        [name]: value,
      };
    });
  }

  const resetPassword = async (e) => {
    try {
      var user = firebase.auth().currentUser;
      var credential = await firebase.auth.EmailAuthProvider.credential(
        currentUser.email,
        password.oldPassword,
      )
      const response = await firebase.auth().sendPasswordResetEmail(currentUser.email)
      console.log(response)
      alert(`A password reset email has been sent to ${currentUser.email}. Please reset your password through the link.`)
    } catch (error) {
      console.log(error, currentUser.email)
    }
  }

  return (
    <>
      <div className="col-md-9">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <h4>Change password</h4>
                <hr />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <p id="securityMessage">Click the following to receive an e-mail in order to reset your password.</p>

                <form>
                  <div className="row">
                    <div className="col-12">
                      <button
                        onClick={resetPassword}
                        type="button"
                        className={
                          activeButton
                            ? "btn btn-primary mx-auto d-block"
                            : "btn btn-primary disabled mx-auto d-block"
                        }
                        id="securityButton"
                      >
                        Update My Password
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SecuritySettings;
